// dna-animation.js
// Renders a rotating 3D DNA double helix on an HTML5 canvas background.

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let angle = 0;

    // Configuration
    const config = {
        strandDistance: 120,
        nodeCount: 60,
        nodeSize: 3,
        verticalSpacing: 25,
        rotationSpeed: 0.012,
        baseColors: ['rgba(99, 102, 241, 0.8)', 'rgba(168, 85, 247, 0.8)', 'rgba(6, 182, 212, 0.8)'],
    };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener("resize", resize);
    resize();

    class DNANode {
        constructor(index, strand) {
            this.index = index;
            this.strand = strand; // 0 or 1
            this.yOffset = index * config.verticalSpacing - (config.nodeCount * config.verticalSpacing) / 2;
            this.baseColor = config.baseColors[index % config.baseColors.length];
        }

        update(currentAngle, scrollY) {
            // Strand 0 is currentAngle, Strand 1 is currentAngle + PI
            const phase = this.strand === 0 ? 0 : Math.PI;
            // Introduce a twist: lower nodes have a slightly advanced angle
            const twist = this.index * 0.25;
            
            this.x = Math.sin(currentAngle + phase + twist) * config.strandDistance;
            this.z = Math.cos(currentAngle + phase + twist) * config.strandDistance;
            // Scale and perspective
            const perspective = 500 / (500 + this.z);
            
            // Apply scroll offset
            const scrollOffset = scrollY * 0.4;

            // Shift it slightly to the right side of the screen
            const xShift = width * 0.15;

            this.screenX = width / 2 + xShift + this.x * perspective;
            this.screenY = height / 2 + this.yOffset * perspective - scrollOffset;
            this.scale = perspective;
            this.alpha = (this.z + config.strandDistance) / (2 * config.strandDistance); // fade out nodes in the back
            this.alpha = 0.15 + this.alpha * 0.85; // Keep it subtle
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.screenX, this.screenY, config.nodeSize * this.scale, 0, Math.PI * 2);
            ctx.fillStyle = this.baseColor.replace('0.8)', `${this.alpha})`);
            ctx.fill();
            
            // Add subtle glow
            ctx.shadowBlur = 12;
            ctx.shadowColor = this.baseColor;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Initialize nodes
    const strands = [[], []];
    for (let i = 0; i < config.nodeCount; i++) {
        strands[0].push(new DNANode(i, 0));
        strands[1].push(new DNANode(i, 1));
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const scrollY = window.scrollY;
        angle += config.rotationSpeed;

        // Update all nodes
        for (let i = 0; i < config.nodeCount; i++) {
            strands[0][i].update(angle, scrollY);
            strands[1][i].update(angle, scrollY);
        }

        // Sort nodes by Z index to draw back to front
        const allNodes = [...strands[0], ...strands[1]].sort((a, b) => b.z - a.z);
        
        // Draw connecting bonds between strands
        for (let i = 0; i < config.nodeCount; i++) {
            const node1 = strands[0][i];
            const node2 = strands[1][i];
            
            const avgAlpha = (node1.alpha + node2.alpha) / 2;
            
            ctx.beginPath();
            ctx.moveTo(node1.screenX, node1.screenY);
            ctx.lineTo(node2.screenX, node2.screenY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${avgAlpha * 0.15})`;
            ctx.lineWidth = 1 * node1.scale;
            ctx.stroke();
        }

        // Draw vertical backbones
        for (let s = 0; s < 2; s++) {
            ctx.beginPath();
            for (let i = 0; i < config.nodeCount; i++) {
                const node = strands[s][i];
                if (i === 0) {
                    ctx.moveTo(node.screenX, node.screenY);
                } else {
                    ctx.lineTo(node.screenX, node.screenY);
                }
            }
            ctx.strokeStyle = `rgba(99, 102, 241, 0.15)`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        allNodes.forEach(node => node.draw(ctx));

        requestAnimationFrame(animate);
    }

    animate();
});
