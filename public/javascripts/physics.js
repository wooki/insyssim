
var Physics = {

    gravitational_constant: function() {
        return 6.67398*Math.pow(10, -11);
    },

    // convert angle and dist to vector
    to_vector: function(angle, distance) {

        var x = distance * Math.cos(angle);
        var y = distance * Math.sin(angle);
        return {x: x, y: y};
    },


    // add two vectors
    add_vector: function(v1, v2) {
        var x = v1.x + v2.x;
        var y = v1.y + v2.y;
        return {x: x, y: y};
    },

    // work out the attraction of two masses
    gravity: function(m1, m2, distance) {
        return Physics.gravitational_constant() * ( ( m1 * m2 ) / ( 1000 * 1000 * distance * distance ) )
    },

    // Newtons second law of motion
    acceleration: function(mass, force) {
        return ( (1 / mass) * force );
    },

    // Newtons second law of motion
    acceleration_to_distance: function(acceleration, time) {
        return ( 0.5 * ( acceleration * (time*time) ) );
    },

    // distance between two points
    distance: function(p1, p2) {
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return Math.sqrt((dx*dx) + (dy*dy));
    },

    // convert to radians
    to_radians: function(degrees) {
        return degrees * (Math.PI / 180);
    },

    // attraction between actual points returned as a vector
    gravity_vector: function(p1, p2) {

        var distance = Physics.distance(p1, p2);
        var g = Physics.gravity(p1.mass, p2.mass, distance);
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        var angle = 0;

        if (dx !== 0 || dy !== 0) {

            angle = Math.atan2(dy, dx);
        }

        // work out the distance for the acceleration for 1 day
        // at the specified g (acceleration)
        var acceleration = Physics.acceleration(p1.mass, g);
        acceleration = acceleration * 0.1;
        var acceleration_to_distance = Physics.acceleration_to_distance(acceleration, 1);

        var v = Physics.to_vector(angle, acceleration_to_distance);
        return v;
    }
};