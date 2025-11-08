const canvasSketch = require("canvas-sketch");
const Random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const palettes = require("nice-color-palettes");

const defaultSeed = "";
Random.setSeed(defaultSeed || Random.getRandomSeed());
console.log("Random Seed:", Random.getSeed());

const settings = {
  hotkeys: false,
  suffix: Random.getSeed(),
  dimensions: [1500, 1500]
};

class VoronoiPoint {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.connections = [];
    this.angle = Random.range(0, Math.PI * 2);
    this.speed = Random.range(0.02, 0.1);
    this.radius = Random.range(10, 50);
  }

  connect(point) {
    if (!this.connections.includes(point)) {
      this.connections.push(point);
      point.connections.push(this);
    }
  }
}

const voronoi_sketch = () => {
  const palette = Random.shuffle(Random.pick(palettes)).slice(0, 5);
  const numPoints = Random.rangeFloor(20, 50);
  const points = [];
  const subdivisions = Random.rangeFloor(3, 8);
  
  // Create grid-based points with random offsets
  for (let y = 0; y < subdivisions; y++) {
    for (let x = 0; x < subdivisions; x++) {
      const xPos = x / (subdivisions - 1) + Random.range(-0.05, 0.05);
      const yPos = y / (subdivisions - 1) + Random.range(-0.05, 0.05);
      points.push(new VoronoiPoint(
        xPos,
        yPos,
        Random.pick(palette)
      ));
    }
  }

  // Create Delaunay-like connections
  points.forEach((point, i) => {
    const nearestPoints = points
      .filter((p, idx) => idx !== i)
      .sort((a, b) => {
        const distA = Math.hypot(point.x - a.x, point.y - a.y);
        const distB = Math.hypot(point.x - b.x, point.y - b.y);
        return distA - distB;
      })
      .slice(0, 3);

    nearestPoints.forEach(nearPoint => point.connect(nearPoint));
  });

  // Drawing function
  return ({ context, width, height }) => {
    // Clear background
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);

    const margin = width * 0.1;

    // Draw connections
    points.forEach(point => {
      point.connections.forEach(connected => {
        const gradient = context.createLinearGradient(
          lerp(margin, width - margin, point.x),
          lerp(margin, height - margin, point.y),
          lerp(margin, width - margin, connected.x),
          lerp(margin, height - margin, connected.y)
        );

        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, connected.color);

        context.beginPath();
        context.strokeStyle = gradient;
        context.lineWidth = Random.range(1, 3);
        context.moveTo(
          lerp(margin, width - margin, point.x),
          lerp(margin, height - margin, point.y)
        );
        
        // Create curved connections with reduced offset range
        const midX = (point.x + connected.x) / 2;
        const midY = (point.y + connected.y) / 2;
        const offset = Random.range(-0.02, 0.02);
        
        context.quadraticCurveTo(
          lerp(margin, width - margin, midX + offset),
          lerp(margin, height - margin, midY + offset),
          lerp(margin, width - margin, connected.x),
          lerp(margin, height - margin, connected.y)
        );
        
        context.stroke();
      });
    });

    // Draw points
    points.forEach(point => {
      context.beginPath();
      context.fillStyle = point.color;
      context.arc(
        lerp(margin, width - margin, point.x),
        lerp(margin, height - margin, point.y),
        point.radius * (width / 1500),
        0,
        Math.PI * 2
      );
      context.fill();

      // Add inner circle
      context.beginPath();
      context.fillStyle = 'hsla(0, 0%, 100%, 0.5)';
      context.arc(
        lerp(margin, width - margin, point.x),
        lerp(margin, height - margin, point.y),
        point.radius * 0.5 * (width / 1500),
        0,
        Math.PI * 2
      );
      context.fill();
    });
  };
};

export default voronoi_sketch;