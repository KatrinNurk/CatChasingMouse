// Configuration
const Config = {
  TILE_SIZE: 48,
  ROWS: 15,
  COLS: 20,
};

// Maze tilemap (0 = path, 1 = wall)
// All paths are connected so the cat can reach all mice
const mazeLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Check if a tile is a wall
function isWall(x, y) {
  return mazeLayout[y] && mazeLayout[y][x] === 1;
}

// Draw the maze
function drawMaze(ctx) {
  for (let row = 0; row < Config.ROWS; row++) {
    for (let col = 0; col < Config.COLS; col++) {
      const tile = mazeLayout[row][col];
      const x = col * Config.TILE_SIZE;
      const y = row * Config.TILE_SIZE;
      const size = Config.TILE_SIZE;
      const pixel = size / 16;

      if (tile === 1) {
        // Wood wall - detailed pixel art
        // Base wood color
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x, y, size, size);

        // Wood grain pattern (horizontal lines)
        ctx.fillStyle = '#6B3510';
        ctx.fillRect(x, y + pixel * 2, size, pixel);
        ctx.fillRect(x, y + pixel * 6, size, pixel);
        ctx.fillRect(x, y + pixel * 10, size, pixel);
        ctx.fillRect(x, y + pixel * 14, size, pixel);

        // Lighter wood highlights
        ctx.fillStyle = '#A0522D';
        ctx.fillRect(x + pixel * 1, y + pixel * 0, pixel * 3, pixel * 2);
        ctx.fillRect(x + pixel * 8, y + pixel * 0, pixel * 4, pixel * 2);
        ctx.fillRect(x + pixel * 3, y + pixel * 3, pixel * 5, pixel * 2);
        ctx.fillRect(x + pixel * 11, y + pixel * 3, pixel * 3, pixel * 2);
        ctx.fillRect(x + pixel * 0, y + pixel * 7, pixel * 4, pixel * 2);
        ctx.fillRect(x + pixel * 7, y + pixel * 7, pixel * 5, pixel * 2);
        ctx.fillRect(x + pixel * 2, y + pixel * 11, pixel * 4, pixel * 2);
        ctx.fillRect(x + pixel * 9, y + pixel * 11, pixel * 5, pixel * 2);

        // Wood knots (darker circles)
        ctx.fillStyle = '#4a2a0a';
        ctx.fillRect(x + pixel * 4, y + pixel * 4, pixel * 2, pixel * 2);
        ctx.fillRect(x + pixel * 12, y + pixel * 8, pixel * 2, pixel * 2);
        ctx.fillRect(x + pixel * 2, y + pixel * 12, pixel * 2, pixel * 1);

        // Dark edges for depth
        ctx.fillStyle = '#3d2314';
        ctx.fillRect(x, y, pixel, size);
        ctx.fillRect(x, y, size, pixel);

        // Light edge for 3D effect
        ctx.fillStyle = '#a86932';
        ctx.fillRect(x + size - pixel, y, pixel, size);
        ctx.fillRect(x, y + size - pixel, size, pixel);

      } else {
        // Floor path - wood floor / dirt path
        ctx.fillStyle = '#2d1f14';
        ctx.fillRect(x, y, size, size);

        // Floor texture pattern
        ctx.fillStyle = '#3d2a1a';
        ctx.fillRect(x + pixel * 1, y + pixel * 1, pixel * 6, pixel * 6);
        ctx.fillRect(x + pixel * 9, y + pixel * 1, pixel * 6, pixel * 6);
        ctx.fillRect(x + pixel * 1, y + pixel * 9, pixel * 6, pixel * 6);
        ctx.fillRect(x + pixel * 9, y + pixel * 9, pixel * 6, pixel * 6);

        // Subtle highlights
        ctx.fillStyle = '#4d3a2a';
        ctx.fillRect(x + pixel * 2, y + pixel * 2, pixel * 2, pixel * 2);
        ctx.fillRect(x + pixel * 10, y + pixel * 3, pixel * 2, pixel * 2);
        ctx.fillRect(x + pixel * 3, y + pixel * 10, pixel * 2, pixel * 2);
        ctx.fillRect(x + pixel * 11, y + pixel * 11, pixel * 2, pixel * 2);

        // Small pebbles/debris
        ctx.fillStyle = '#5a4535';
        ctx.fillRect(x + pixel * 5, y + pixel * 5, pixel, pixel);
        ctx.fillRect(x + pixel * 12, y + pixel * 7, pixel, pixel);
        ctx.fillRect(x + pixel * 3, y + pixel * 13, pixel, pixel);
        ctx.fillRect(x + pixel * 14, y + pixel * 2, pixel, pixel);
      }
    }
  }
}

// Input handling
const keys = new Set();
window.addEventListener('keydown', (e) => keys.add(e.key));
window.addEventListener('keyup', (e) => keys.delete(e.key));

function consumeKey(key) {
  if (keys.has(key)) {
    keys.delete(key);
    return true;
  }
  return false;
}

// Valid spawn points for cat (balanced positions - not too close to mice or edges)
const catSpawnPoints = [
  { x: 5, y: 3 },   // Upper-left area
  { x: 5, y: 7 },   // Middle-left area
  { x: 5, y: 11 },  // Lower-left area
  { x: 10, y: 5 },  // Upper-center
  { x: 10, y: 9 },  // Lower-center
  { x: 14, y: 7 },  // Middle-right area
];

// Get a random spawn point for cat
function getRandomCatSpawn() {
  const index = Math.floor(Math.random() * catSpawnPoints.length);
  return catSpawnPoints[index];
}

// Cat object
const initialSpawn = getRandomCatSpawn();
const cat = {
  x: initialSpawn.x,
  y: initialSpawn.y,
  color: 'orange',
  move(inputHandler, maze) {
    let newX = this.x;
    let newY = this.y;

    if (consumeKey('ArrowUp')) newY--;
    if (consumeKey('ArrowDown')) newY++;
    if (consumeKey('ArrowLeft')) newX--;
    if (consumeKey('ArrowRight')) newX++;

    if (!isWall(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  },
  draw(ctx) {
    const x = this.x * Config.TILE_SIZE;
    const y = this.y * Config.TILE_SIZE;
    const size = Config.TILE_SIZE;
    const pixel = size / 16; // 16x16 pixel grid for more detail

    // Cat body (orange)
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(x + pixel * 3, y + pixel * 6, pixel * 10, pixel * 7);
    ctx.fillRect(x + pixel * 4, y + pixel * 5, pixel * 8, pixel * 1);

    // Cat head (orange)
    ctx.fillRect(x + pixel * 4, y + pixel * 2, pixel * 8, pixel * 5);
    ctx.fillRect(x + pixel * 5, y + pixel * 1, pixel * 6, pixel * 1);

    // Cat ears (orange triangular)
    ctx.fillRect(x + pixel * 3, y + pixel * 0, pixel * 3, pixel * 3);
    ctx.fillRect(x + pixel * 10, y + pixel * 0, pixel * 3, pixel * 3);
    ctx.fillRect(x + pixel * 2, y + pixel * 1, pixel * 1, pixel * 2);
    ctx.fillRect(x + pixel * 13, y + pixel * 1, pixel * 1, pixel * 2);

    // Inner ears (pink)
    ctx.fillStyle = '#ffaaaa';
    ctx.fillRect(x + pixel * 4, y + pixel * 1, pixel * 1, pixel * 2);
    ctx.fillRect(x + pixel * 11, y + pixel * 1, pixel * 1, pixel * 2);

    // Cat eyes (green)
    ctx.fillStyle = '#00cc00';
    ctx.fillRect(x + pixel * 5, y + pixel * 4, pixel * 2, pixel * 2);
    ctx.fillRect(x + pixel * 9, y + pixel * 4, pixel * 2, pixel * 2);

    // Eye pupils (black)
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + pixel * 5, y + pixel * 4, pixel * 1, pixel * 2);
    ctx.fillRect(x + pixel * 9, y + pixel * 4, pixel * 1, pixel * 2);

    // Eye shine (white)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + pixel * 6, y + pixel * 4, pixel * 1, pixel * 1);
    ctx.fillRect(x + pixel * 10, y + pixel * 4, pixel * 1, pixel * 1);

    // Cat nose (pink)
    ctx.fillStyle = '#ff6699';
    ctx.fillRect(x + pixel * 7, y + pixel * 6, pixel * 2, pixel * 1);

    // Cat mouth (dark)
    ctx.fillStyle = '#cc6600';
    ctx.fillRect(x + pixel * 7, y + pixel * 7, pixel * 1, pixel * 1);
    ctx.fillRect(x + pixel * 8, y + pixel * 7, pixel * 1, pixel * 1);

    // Cat whiskers (white)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + pixel * 1, y + pixel * 5, pixel * 3, pixel * 1);
    ctx.fillRect(x + pixel * 1, y + pixel * 7, pixel * 3, pixel * 1);
    ctx.fillRect(x + pixel * 12, y + pixel * 5, pixel * 3, pixel * 1);
    ctx.fillRect(x + pixel * 12, y + pixel * 7, pixel * 3, pixel * 1);

    // Cat stripes (darker orange)
    ctx.fillStyle = '#cc6600';
    ctx.fillRect(x + pixel * 6, y + pixel * 2, pixel * 1, pixel * 2);
    ctx.fillRect(x + pixel * 9, y + pixel * 2, pixel * 1, pixel * 2);
    ctx.fillRect(x + pixel * 5, y + pixel * 8, pixel * 1, pixel * 3);
    ctx.fillRect(x + pixel * 7, y + pixel * 9, pixel * 2, pixel * 2);
    ctx.fillRect(x + pixel * 10, y + pixel * 8, pixel * 1, pixel * 3);

    // Cat legs (orange)
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(x + pixel * 3, y + pixel * 13, pixel * 2, pixel * 3);
    ctx.fillRect(x + pixel * 6, y + pixel * 13, pixel * 2, pixel * 3);
    ctx.fillRect(x + pixel * 8, y + pixel * 13, pixel * 2, pixel * 3);
    ctx.fillRect(x + pixel * 11, y + pixel * 13, pixel * 2, pixel * 3);

    // Cat paws (lighter orange)
    ctx.fillStyle = '#ffaa44';
    ctx.fillRect(x + pixel * 3, y + pixel * 15, pixel * 2, pixel * 1);
    ctx.fillRect(x + pixel * 6, y + pixel * 15, pixel * 2, pixel * 1);
    ctx.fillRect(x + pixel * 8, y + pixel * 15, pixel * 2, pixel * 1);
    ctx.fillRect(x + pixel * 11, y + pixel * 15, pixel * 2, pixel * 1);

    // Cat tail (orange, curved)
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(x + pixel * 13, y + pixel * 7, pixel * 2, pixel * 2);
    ctx.fillRect(x + pixel * 14, y + pixel * 5, pixel * 2, pixel * 3);
    ctx.fillRect(x + pixel * 14, y + pixel * 4, pixel * 1, pixel * 2);
  },
  reset() {
    const spawn = getRandomCatSpawn();
    this.x = spawn.x;
    this.y = spawn.y;
  }
};

// Mouse class
class Mouse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.color = 'blue';
    this.moveTimer = 0;
  }

  move() {
    this.moveTimer++;
    if (this.moveTimer < 30) return;
    this.moveTimer = 0;

    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];

    const validMoves = directions.filter((dir) => {
      const newX = this.x + dir.x;
      const newY = this.y + dir.y;
      return !isWall(newX, newY);
    });

    if (validMoves.length > 0) {
      const move = validMoves[Math.floor(Math.random() * validMoves.length)];
      this.x += move.x;
      this.y += move.y;
    }
  }

  draw(ctx) {
    const x = this.x * Config.TILE_SIZE;
    const y = this.y * Config.TILE_SIZE;
    const size = Config.TILE_SIZE;
    const pixel = size / 16; // 16x16 pixel grid for more detail

    // Mouse body (gray gradient)
    ctx.fillStyle = '#999999';
    ctx.fillRect(x + pixel * 4, y + pixel * 7, pixel * 8, pixel * 5);
    ctx.fillRect(x + pixel * 3, y + pixel * 8, pixel * 10, pixel * 3);
    ctx.fillStyle = '#aaaaaa';
    ctx.fillRect(x + pixel * 5, y + pixel * 8, pixel * 6, pixel * 3);

    // Mouse head (gray)
    ctx.fillStyle = '#999999';
    ctx.fillRect(x + pixel * 10, y + pixel * 5, pixel * 4, pixel * 5);
    ctx.fillRect(x + pixel * 11, y + pixel * 4, pixel * 3, pixel * 2);
    ctx.fillRect(x + pixel * 12, y + pixel * 3, pixel * 3, pixel * 2);

    // Mouse snout (lighter gray)
    ctx.fillStyle = '#bbbbbb';
    ctx.fillRect(x + pixel * 13, y + pixel * 6, pixel * 2, pixel * 3);

    // Mouse ears (pink, round)
    ctx.fillStyle = '#ffaaaa';
    ctx.fillRect(x + pixel * 10, y + pixel * 2, pixel * 3, pixel * 3);
    ctx.fillRect(x + pixel * 9, y + pixel * 3, pixel * 1, pixel * 1);
    ctx.fillStyle = '#ff8888';
    ctx.fillRect(x + pixel * 11, y + pixel * 3, pixel * 1, pixel * 1);

    // Mouse eye (black with shine)
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + pixel * 12, y + pixel * 5, pixel * 2, pixel * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + pixel * 12, y + pixel * 5, pixel * 1, pixel * 1);

    // Mouse nose (pink)
    ctx.fillStyle = '#ff6666';
    ctx.fillRect(x + pixel * 14, y + pixel * 7, pixel * 2, pixel * 2);

    // Mouse whiskers (white)
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(x + pixel * 14, y + pixel * 6, pixel * 2, pixel * 1);
    ctx.fillRect(x + pixel * 14, y + pixel * 9, pixel * 2, pixel * 1);

    // Mouse tail (pink, curved)
    ctx.fillStyle = '#ffaaaa';
    ctx.fillRect(x + pixel * 1, y + pixel * 8, pixel * 3, pixel * 2);
    ctx.fillRect(x + pixel * 0, y + pixel * 7, pixel * 2, pixel * 2);
    ctx.fillRect(x + pixel * 0, y + pixel * 6, pixel * 1, pixel * 2);
    ctx.fillStyle = '#ff9999';
    ctx.fillRect(x + pixel * 0, y + pixel * 7, pixel * 1, pixel * 1);

    // Mouse feet (pink)
    ctx.fillStyle = '#ffaaaa';
    ctx.fillRect(x + pixel * 4, y + pixel * 12, pixel * 2, pixel * 2);
    ctx.fillRect(x + pixel * 7, y + pixel * 12, pixel * 2, pixel * 2);
    ctx.fillRect(x + pixel * 10, y + pixel * 12, pixel * 2, pixel * 2);

    // Mouse belly (lighter)
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(x + pixel * 6, y + pixel * 10, pixel * 4, pixel * 2);
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }
}

// Fish class (collectible)
class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    const x = this.x * Config.TILE_SIZE;
    const y = this.y * Config.TILE_SIZE;
    const size = Config.TILE_SIZE;
    const pixel = size / 16;

    // Fish body (blue)
    ctx.fillStyle = '#4a9fff';
    ctx.fillRect(x + pixel * 4, y + pixel * 6, pixel * 8, pixel * 4);
    ctx.fillRect(x + pixel * 3, y + pixel * 7, pixel * 10, pixel * 2);

    // Fish tail
    ctx.fillStyle = '#3a8fef';
    ctx.fillRect(x + pixel * 1, y + pixel * 6, pixel * 3, pixel * 4);
    ctx.fillRect(x + pixel * 2, y + pixel * 5, pixel * 2, pixel * 6);

    // Fish fins
    ctx.fillStyle = '#5ab0ff';
    ctx.fillRect(x + pixel * 7, y + pixel * 4, pixel * 3, pixel * 2);
    ctx.fillRect(x + pixel * 7, y + pixel * 10, pixel * 3, pixel * 2);

    // Fish eye
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + pixel * 10, y + pixel * 7, pixel * 2, pixel * 2);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + pixel * 11, y + pixel * 7, pixel * 1, pixel * 1);

    // Fish scales shimmer
    ctx.fillStyle = '#6ac0ff';
    ctx.fillRect(x + pixel * 5, y + pixel * 7, pixel, pixel);
    ctx.fillRect(x + pixel * 7, y + pixel * 8, pixel, pixel);
    ctx.fillRect(x + pixel * 9, y + pixel * 7, pixel, pixel);
  }
}

// Dog class (enemy)
class Dog {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.moveTimer = 0;
  }

  move(catX, catY) {
    this.moveTimer++;
    if (this.moveTimer < 20) return;
    this.moveTimer = 0;

    // Chase the cat
    const dx = catX - this.x;
    const dy = catY - this.y;

    const directions = [];
    if (dx > 0 && !isWall(this.x + 1, this.y)) directions.push({ x: 1, y: 0 });
    if (dx < 0 && !isWall(this.x - 1, this.y)) directions.push({ x: -1, y: 0 });
    if (dy > 0 && !isWall(this.x, this.y + 1)) directions.push({ x: 0, y: 1 });
    if (dy < 0 && !isWall(this.x, this.y - 1)) directions.push({ x: 0, y: -1 });

    if (directions.length > 0) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      this.x += dir.x;
      this.y += dir.y;
    }
  }

  draw(ctx) {
    const x = this.x * Config.TILE_SIZE;
    const y = this.y * Config.TILE_SIZE;
    const size = Config.TILE_SIZE;
    const pixel = size / 16;

    // Dog body (brown)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + pixel * 3, y + pixel * 5, pixel * 10, pixel * 7);
    ctx.fillRect(x + pixel * 4, y + pixel * 4, pixel * 8, pixel * 9);

    // Dog head
    ctx.fillStyle = '#a0522d';
    ctx.fillRect(x + pixel * 2, y + pixel * 2, pixel * 8, pixel * 6);
    ctx.fillRect(x + pixel * 1, y + pixel * 3, pixel * 9, pixel * 4);

    // Dog ears (floppy)
    ctx.fillStyle = '#6B3510';
    ctx.fillRect(x + pixel * 1, y + pixel * 1, pixel * 2, pixel * 4);
    ctx.fillRect(x + pixel * 8, y + pixel * 1, pixel * 2, pixel * 4);

    // Dog snout
    ctx.fillStyle = '#c4a484';
    ctx.fillRect(x + pixel * 3, y + pixel * 5, pixel * 4, pixel * 3);

    // Dog nose
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + pixel * 4, y + pixel * 5, pixel * 2, pixel * 2);

    // Dog eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + pixel * 2, y + pixel * 3, pixel * 2, pixel * 2);
    ctx.fillRect(x + pixel * 6, y + pixel * 3, pixel * 2, pixel * 2);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + pixel * 3, y + pixel * 3, pixel * 1, pixel * 1);
    ctx.fillRect(x + pixel * 7, y + pixel * 3, pixel * 1, pixel * 1);

    // Dog tongue
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(x + pixel * 5, y + pixel * 7, pixel * 2, pixel * 2);

    // Dog legs
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + pixel * 4, y + pixel * 12, pixel * 2, pixel * 3);
    ctx.fillRect(x + pixel * 10, y + pixel * 12, pixel * 2, pixel * 3);

    // Dog tail (wagging)
    ctx.fillStyle = '#6B3510';
    ctx.fillRect(x + pixel * 13, y + pixel * 6, pixel * 2, pixel * 3);
    ctx.fillRect(x + pixel * 14, y + pixel * 5, pixel * 1, pixel * 2);
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }
}

// Game state
let mice = [
  new Mouse(18, 1),   // Top-right area
  new Mouse(1, 13),   // Bottom-left area
  new Mouse(18, 13),  // Bottom-right area
  new Mouse(10, 7),   // Center area
];
let fish = [
  new Fish(3, 5),
  new Fish(16, 3),
  new Fish(8, 9),
  new Fish(14, 11),
  new Fish(5, 13),
];
let dog = new Dog(15, 7);
let timeLeft = 45;
let lastTime = Date.now();
let running = true;
let gameOver = false;
let won = false;
let score = 0;

// Initialize canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Update canvas size to match maze
canvas.width = Config.COLS * Config.TILE_SIZE;
canvas.height = Config.ROWS * Config.TILE_SIZE;

// Draw HUD
function drawHUD() {
  const hudX = 5;
  const hudY = 5;
  const hudWidth = 180;
  const hudHeight = 110;
  const pixel = 4;

  // Blackboard background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(hudX, hudY, hudWidth, hudHeight);

  // Blackboard frame (wood)
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(hudX, hudY, hudWidth, pixel * 2); // Top
  ctx.fillRect(hudX, hudY + hudHeight - pixel * 2, hudWidth, pixel * 2); // Bottom
  ctx.fillRect(hudX, hudY, pixel * 2, hudHeight); // Left
  ctx.fillRect(hudX + hudWidth - pixel * 2, hudY, pixel * 2, hudHeight); // Right

  // Wood frame highlights
  ctx.fillStyle = '#A0522D';
  ctx.fillRect(hudX + pixel * 2, hudY, hudWidth - pixel * 4, pixel); // Top highlight
  ctx.fillRect(hudX, hudY + pixel * 2, pixel, hudHeight - pixel * 4); // Left highlight

  // Wood frame shadows
  ctx.fillStyle = '#5a3010';
  ctx.fillRect(hudX + pixel * 2, hudY + hudHeight - pixel, hudWidth - pixel * 4, pixel); // Bottom shadow
  ctx.fillRect(hudX + hudWidth - pixel, hudY + pixel * 2, pixel, hudHeight - pixel * 4); // Right shadow

  // Corner decorations
  ctx.fillStyle = '#6B3510';
  ctx.fillRect(hudX, hudY, pixel * 3, pixel * 3);
  ctx.fillRect(hudX + hudWidth - pixel * 3, hudY, pixel * 3, pixel * 3);
  ctx.fillRect(hudX, hudY + hudHeight - pixel * 3, pixel * 3, pixel * 3);
  ctx.fillRect(hudX + hudWidth - pixel * 3, hudY + hudHeight - pixel * 3, pixel * 3, pixel * 3);

  // Chalk dust effect on blackboard
  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(hudX + pixel * 5, hudY + pixel * 4, pixel * 2, pixel);
  ctx.fillRect(hudX + pixel * 12, hudY + pixel * 6, pixel, pixel * 2);
  ctx.fillRect(hudX + hudWidth - pixel * 8, hudY + pixel * 5, pixel * 2, pixel);
  ctx.fillRect(hudX + pixel * 8, hudY + hudHeight - pixel * 6, pixel, pixel);

  // Chalk text
  ctx.fillStyle = '#e8e8e8';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Time: ${timeLeft.toFixed(1)}s`, hudX + 15, hudY + 25);
  ctx.fillText(`Mice: ${mice.length}`, hudX + 15, hudY + 45);
  ctx.fillText(`Fish: ${fish.length}`, hudX + 15, hudY + 65);
  ctx.fillText(`Score: ${score}`, hudX + 15, hudY + 85);

  // Chalk effect - slightly rough edges on text
  ctx.fillStyle = '#cccccc';
  ctx.fillRect(hudX + 14, hudY + 18, pixel / 2, pixel / 2);
  ctx.fillRect(hudX + 100, hudY + 40, pixel / 2, pixel / 2);
  ctx.fillRect(hudX + 80, hudY + 62, pixel / 2, pixel / 2);
}

// Display message
function displayMessage(message) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 20);
  ctx.font = '24px Arial';
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
  ctx.font = '16px Arial';
  ctx.fillText('Click Restart to play again', canvas.width / 2, canvas.height / 2 + 60);
}

// Check collisions
function checkCollisions() {
  // Check mouse collisions
  const previousMiceCount = mice.length;
  mice = mice.filter((mouse) => !(cat.x === mouse.x && cat.y === mouse.y));
  const caughtMice = previousMiceCount - mice.length;
  if (caughtMice > 0) {
    score += caughtMice;
  }

  // Check fish collisions
  const previousFishCount = fish.length;
  fish = fish.filter((f) => !(cat.x === f.x && cat.y === f.y));
  const eatenFish = previousFishCount - fish.length;
  if (eatenFish > 0) {
    score += eatenFish;
  }

  // Check dog collision
  if (cat.x === dog.x && cat.y === dog.y) {
    score = Math.max(0, score - 1);
    // Move cat away from dog
    const spawn = getRandomCatSpawn();
    cat.x = spawn.x;
    cat.y = spawn.y;
  }
}

// Check win/lose conditions
function checkWinLose() {
  if (mice.length === 0) {
    running = false;
    gameOver = true;
    won = true;
  } else if (timeLeft <= 0) {
    running = false;
    gameOver = true;
    won = false;
  }
}

// Restart game
function restart() {
  cat.reset();
  mice = [
    new Mouse(18, 1),   // Top-right area
    new Mouse(1, 13),   // Bottom-left area
    new Mouse(18, 13),  // Bottom-right area
    new Mouse(10, 7),   // Center area
  ];
  fish = [
    new Fish(3, 5),
    new Fish(16, 3),
    new Fish(8, 9),
    new Fish(14, 11),
    new Fish(5, 13),
  ];
  dog = new Dog(15, 7);
  timeLeft = 45;
  lastTime = Date.now();
  running = true;
  gameOver = false;
  won = false;
  score = 0;
  gameLoop();
}

// Game loop
function gameLoop() {
  if (!running) {
    displayMessage(won ? 'You Win!' : 'Game Over');
    return;
  }

  // Update timer
  const now = Date.now();
  const delta = (now - lastTime) / 1000;
  lastTime = now;
  timeLeft = Math.max(0, timeLeft - delta);

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw maze
  drawMaze(ctx);

  // Draw and update fish (static)
  fish.forEach((f) => {
    f.draw(ctx);
  });

  // Update and draw cat
  cat.move();
  cat.draw(ctx);

  // Update and draw mice
  mice.forEach((mouse) => {
    mouse.move();
    mouse.draw(ctx);
  });

  // Update and draw dog
  dog.move(cat.x, cat.y);
  dog.draw(ctx);

  // Check collisions
  checkCollisions();

  // Draw HUD
  drawHUD();

  // Check win/lose
  checkWinLose();

  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

// Restart button
const restartButton = document.createElement('button');
restartButton.textContent = 'Restart';
restartButton.style.position = 'absolute';
restartButton.style.top = '10px';
restartButton.style.right = '10px';
restartButton.style.padding = '10px';
restartButton.style.fontSize = '16px';
restartButton.style.cursor = 'pointer';
document.body.appendChild(restartButton);

restartButton.addEventListener('click', restart);

// Mobile touch controls
function setupMobileControls() {
  const btnUp = document.getElementById('btn-up');
  const btnDown = document.getElementById('btn-down');
  const btnLeft = document.getElementById('btn-left');
  const btnRight = document.getElementById('btn-right');

  if (!btnUp) return; // Controls not in DOM

  // Directly add/remove from keys Set
  function pressKey(key) {
    keys.add(key);
    // Auto-release after a short delay for tap behavior
    setTimeout(() => keys.delete(key), 150);
  }

  // Touch events (for mobile)
  btnUp.addEventListener('touchstart', (e) => { e.preventDefault(); pressKey('ArrowUp'); });
  btnDown.addEventListener('touchstart', (e) => { e.preventDefault(); pressKey('ArrowDown'); });
  btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); pressKey('ArrowLeft'); });
  btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); pressKey('ArrowRight'); });

  // Mouse clicks (for desktop testing)
  btnUp.addEventListener('mousedown', (e) => { e.preventDefault(); pressKey('ArrowUp'); });
  btnDown.addEventListener('mousedown', (e) => { e.preventDefault(); pressKey('ArrowDown'); });
  btnLeft.addEventListener('mousedown', (e) => { e.preventDefault(); pressKey('ArrowLeft'); });
  btnRight.addEventListener('mousedown', (e) => { e.preventDefault(); pressKey('ArrowRight'); });
}

setupMobileControls();