var insyssim = {

    bodies: false,

    create_body: function(data, layer) {
        var radius = data.radius;
        if (radius < 100) {
            radius = 50 + (radius * 5);
        }
        var circle = new Kinetic.Circle({
            x: data.x,
            y: data.y,
            radius: radius,
            fill: data.color
        });
        circle.on('click', function(event) {
           alert("Click: "+data.name);
        });

        // handle the movement and gravity
        if (data.parent !== false) {
            var anim = new Kinetic.Animation(function(frame) {
                var frame_time = frame.time / 1000; // into seconds

                // current vector
                var dx = data.dx;
                var dy = data.dy;
                var v1 = {x: dx, y: dy};

                // calculate gravity vs parent
                var p2 = false;
                insyssim.bodies.each(function(key, body) {
                    if (data.parent == body.name) {
                        p2 = body;
                    }
                });
                if (p2 !== false) {
                    var v2 = Physics.gravity_vector(data, p2);
                    v2.x = v2.x * (1+frame_time);
                    v2.y = v2.y * (1+frame_time);
                    v1 = Physics.add_vector(v1, v2);
                }

                // remember new position & vector
                data.dx = v1.x;
                data.dy = v1.y;
                data.x = circle.getX() + data.dx;
                data.y = circle.getY() + data.dy;

                // set new position
                circle.setX(data.x);
                circle.setY(data.y);

            }, layer);
            anim.start();
        }

        return circle;
    }
};


// draw the scene
$(document).ready(function() {

    // read the data from the state using ajax
    $.ajax({
        url: '/state',
        success: function(data, status, xhr) {

            var scene_data = JSON.parse(data);
            insyssim.bodies = $(scene_data.bodies);

            // calculate scale factor to go full width/height
            var scalefactor = $('#container').width() / scene_data.size;
            scalefactor = 600 / scene_data.size;

            var stage = new Kinetic.Stage({
                container: 'container',
                width: scene_data.size * scalefactor,
                height: scene_data.size * scalefactor
              });
            stage.setScale(scalefactor);
            var bodies = new Kinetic.Layer();

            // add a background
            var background = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: scene_data.size,
                height: scene_data.size,
                fill: 'black'
            });
            bodies.add(background);

            // add the bodies to the layer
            insyssim.bodies.each(function (key, body) {
                var body_object = insyssim.create_body(body, bodies);
                bodies.add(body_object);
            });

            // add the layer to the stage
            stage.add(bodies);

        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });


});