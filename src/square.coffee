define ['src/utils', 'src/constants'], (Utils, Const) ->

    class Square

        constructor: (@face, @position) ->

            [@x, @y, @z] = [@position.x, @position.y, @position.z]

            @neighbours = {}
            @status = 'off'
            @node = null

            # A hash of items on the square (food, snake, etc..).
            @_items = {}

        on: (item = 'snake') ->

            @_items[item] = true
            @status = 'on'

        off: (item = 'snake') ->

            @_items[item] = false
            @status = 'off'

        add: (item) -> @_items[item] = true

        remove: (item) -> @_items[item] = false

        has: (item) -> @_items[item] is true

        connect: (square) ->

            return unless square
            return if square is @

            direction = square.position.clone().sub @position
            direction.divideScalar Const.squareSize

            # Adjust the connection for faces on edges
            unless direction.isVersor()
                direction[@face.axis] = 0

            @neighbours[direction] = square

        adjacencies: (square) ->

            near = 0
            same = 0
            for axis, value of @position.items()
                if value is square[axis]
                    same += 1
                else if Math.abs(value - square[axis]) is Const.squareSize
                    near += 1

            return 0 if (near + same) isnt 3

            near

        adjacentTo: (square) ->

            @adjacencies(square) is 1
