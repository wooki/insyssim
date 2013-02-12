
/*
 * GET current state of objects in scene as json
 */

exports.index = function(req, res){

    // hard coded positions
    var scene_size = 10000;
    var scene_scale = 0.000001;
    var centre = scene_size/2;
    var bodies = [];
    bodies.push({
        name: 'Sol',
        mass: 2.03*Math.pow(10, 30)*scene_scale,
        radius: 69595000*scene_scale,
        x: centre,
        y: centre,
        dx: 0,
        dy: 0,
        color: 'yellow',
        parent: false
    });
    bodies.push({
        name: 'Jupiter',
        mass: 1.93*Math.pow(10, 27)*scene_scale,
        radius: 7149200*scene_scale,
        x: centre,
        y: centre-(778330000*scene_scale),
        dx: (2 * Math.PI* (778330))/4333,
        dy: 0,
        color: 'white',
        parent: 'Sol'
    });
    bodies.push({
        name: 'Neptune',
        mass: 1.04*Math.pow(10, 26)*scene_scale,
        radius: 2271600*scene_scale,
        y: centre-(4504300000*scene_scale),
        x: centre,
        dx: (2 * Math.PI* (4504300))/60190,
        dy: 0,
        color: 'blue',
        parent: 'Sol'
    });
    var scene_data = {
        size: scene_size,
        bodies: bodies
    };

    // convert to json
    res.send(JSON.stringify(scene_data));

};