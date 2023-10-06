from flask import Flask, render_template, request, jsonify, send_from_directory
import random

app = Flask(__name__)

# Conway's Game of Life Logic
class GameOfLife: # The class
    def __init__(self, rows, cols):
        self.rows = rows 
        self.cols = cols
        self.grid = [[random.randint(0, 1) for _ in range(cols)] for _ in range(rows)]
        self.initial_state = [row[:] for row in self.grid]  # Store the initial state for restarting
        self.paused = False

    def apply_rules(self):
        if not self.paused:
            new_grid = [[0 for _ in range(self.cols)] for _ in range(self.rows)]

            for i in range(self.rows):
                for j in range(self.cols):
                    live_neighbors = self.count_live_neighbors(i, j)

                    if self.grid[i][j]:
                        if live_neighbors < 2 or live_neighbors > 3:
                            # Any live cell with fewer than 2 or more than 3 live neighbours dies.
                            new_grid[i][j] = 0
                        else:
                            new_grid[i][j] = 1
                    else:
                        if live_neighbors == 3:
                            # Any dead cell with exactly 3 live neighbours becomes alive.
                            new_grid[i][j] = 1

            # Update the grid with the new generation.
            self.grid = new_grid

    def count_live_neighbors(self, x, y):
        # Count the number of live neighbours around a cell.
        count = 0
        neighbors = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),           (0, 1),
            (1, -1), (1, 0), (1, 1)
        ]

        for dx, dy in neighbors:
            i, j = x + dx, y + dy

            # Check bounds and count live neighbors.
            if 0 <= i < self.rows and 0 <= j < self.cols:
                count += self.grid[i][j]

        return count

    def restart(self):
        # Restore the initial state to restart the game
        self.grid = [row[:] for row in self.initial_state]
        self.paused = False

    def pause(self):
        # Pause the game
        self.paused = True

    def resume(self):
        # Resume the game
        self.paused = False

# Initialize the Game of Life
rows, cols = 20, 40
game = GameOfLife(rows, cols)

# Route for serving CSS and JavaScript files from the 'static' folder
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

# Additional Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/update_grid', methods=['POST'])
def update_grid():

    # Python backend logic here
    # Receive data from the frontend using request.json
    if 'action' in request.json:
        if request.json['action'] == 'restart':
            game.restart()
        elif request.json['action'] == 'pause':
            game.pause()
        elif request.json['action'] == 'resume':
            game.resume()

    # Apply one generation of Conway's Game of Life
    game.apply_rules()

    # Return the updated grid as JSON to the frontend
    updated_grid = game.grid
    return jsonify(updated_grid)

if __name__ == '__main__':
   # app.run(host='localhost', port=5000, debug=True)
    app.run(host='0.0.0.0', debug=True)
