class Avatar {

    constructor( name = 'default_name' ) {

		//log( 'Create ' + name );
		this.name = name;
		this.root = new THREE.Object3D();
		this.root.name = 'root';
		this.edit = false;

		this.joints = new List( name + '_joints' );
		this.joints_states =  new List( name + '_joints_states' );
		
		this.markers = [];

		//this.test_minimum_cinc();
		//this.test_head_cinc();
		//this.test_cloth_cinc( V( 0.0, 0.0, +0.1 ), V( +hPI/2, 0.0, 0.0 ), +1 );
		this.simple_men();
		
		this.joints.debug_info = true;
		
		this.add_helper_box();
		this.update_edit();
    }

	switch_edit() {
		this.edit = !this.edit;
		this.update_edit();
	}

	update_edit() {

		if( this.edit ) {
			if( this.joints.current_item != undefined) {
				this.markers.forEach( marker => { marker.visible = true; } );
				this.box.visible = true;
				log('avatar ' + this.name + ' edit mode on');
			}
		} 

		if( !this.edit ) {
			this.markers.forEach( marker => { marker.visible = false; } );
			this.box.visible = false;
			log('avatar ' + this.name + ' edit mode off');
		}
	}

	add_helper_box() {
		this.box = box( V( 0.4, 1.6, 0.7 ), V0, V0, mat( 'wire', this.color ), false );
		this.root.add( this.box );
	}
	
	test_minimum_cinc() {
		let data = Object.assign( {}, default_cincture_data );
		data.nodes = [	
			0.60,	0.40,	0.40,	0.40,
			0.60,	0.40,	0.40,	0.40
		];
		//data.scale = 0.5;
		//data.material = tmat('images/test00.jpg');
        let cinc = new Cincture ( data );	
		this.root.add( cinc.mesh );
		
		this.test = cinc;

		this.add_joint( this.test, ['test0', 'test1'], rgb( 0, 200, 0 ), 0.03 );
		this.joints.print();

		this.root.position.set ( 0, 0, 0 );
	}

	test_head_cinc() {
		
		var data = Object.assign( {}, default_cincture_data );
		
		{
			data.offsets = 
			[	
				0.00,   0.00,	0.00,
				0.00,   0.05,	0.00,
				0.00,   0.07,   0.00,
			   -0.01,   0.07,   0.00,
			   -0.01,   0.05,   0.00
			]

			data.rotates = 
			[	
				0.00,   0.00,  -0.30,
				0.00,   0.00,  -0.30,
				0.00,   0.00,  +0.20,
				0.00,   0.00,  +0.15,
				0.00,   0.00,  +0.10
			];

			// data.angles = [
			// 	60, 60, 60, 60, 60, 60,
			// 	60, 60, 60, 60, 60, 60,
			// 	60, 60, 60, 60, 60, 60,
			// 	60, 60, 60, 60, 60, 60,
			// 	60, 60, 60, 60, 60, 60
			// ];

			data.nodes = 
			[	
				0.028,	0.021,	0.020,	0.025,   0.020,   0.021,	
				0.100,	0.080,	0.075,	0.110,   0.075,   0.080,
				0.105,	0.090,	0.085,	0.115,   0.085,   0.090,
				0.100,	0.080,	0.075,	0.110,   0.075,   0.080,		
				0.035,	0.025,	0.020,	0.020,   0.020,   0.025
			];
		}	

		data.start_angle = 180;
		//data.cinc_angle = 180;
		//data.symmetry = true;
		//data.dir = -1;

		data.smooth = { normals: 1, vertices: 1 };
		data.subnodes = 2;
		data.subcincs = 2;
		//data.helpers = this.helpers;
		data.cap_curve = { begin: 2, end: 2 };
		data.material = tmat('images/test00.jpg');
		//data.material = tmat('images/face01.jpg');//, 'images/face01.jpg');
		//data.material.color = rgb( 255, 80, 86 );
		//data.material.color = rgb( 0, 255, 0 );
		//data.uv = { x: 0, y: 0, height: 1, width: 1 };
		//log(data.material);

        let cinc = new Cincture ( data );	

		//this.test.mesh.translateX (1);
		// this.test.mesh.name = 'test';
		// this.test.mesh.cinc = this.test;
		// this.test.mesh.pickable = true;
		// App.world.content.push( this.test.mesh );
		App.world.add( cinc.mesh, 'test', true );
		this.root.add( cinc.mesh );

		this.test = cinc;
		this.add_bones_to_joints_list( this.test );
	}

	test_cloth_cinc( dp, dr, mirror ) {
		
		var data = Object.assign( {}, default_cincture_data );
		
		{
			data.offsets = 
			[	
				0.00,   0.00,	0.00,
				0.00,   0.10,	0.00,
				0.00,   0.10,	0.00,
				0.00,   0.10,	0.00
			];

			data.rotates = 
			[	
				0.00,   0.00,   0.00,
				0.00,   0.00,   0.00,
				0.00,   0.00,   0.00,
				0.00,   0.00,   0.00
			];

			data.nodes = 
			[	
				0.10,	0.10,	0.10,	0.10,	
				0.10,	0.10,	0.10,	0.10,	
				0.10,	0.10,	0.10,	0.10,	
				0.10,	0.10,	0.10,	0.10
			];

			data.angles = [
				80, 90, 90, 100,
				90, 90, 90, 90,
				90, 90, 90, 90,
				100, 90, 90, 80
			];	
		}

		data.start_angle = 180;
		//data.cinc_angle = 180;
		//data.symmetry = true;
		data.mirror = mirror;

		data.smooth = { normals: 1, vertices: 1 };
		data.subnodes = 2;
		data.subcincs = 2;
		//data.helpers = this.helpers;
		//data.cap_curve = { begin: 1, end: 1 };
		data.material = tmat('images/test00.jpg');
		data.material.side = THREE.DoubleSide;
		data.material.color = rgb( 255, 255, 255 );
		//data.uv = { x: 0, y: 0, height: 1, width: 1 };
		data.cap =  { begin: false, end: false };
		//data.clamp_cinc = { begin: 0, end: 2 };
		//data.cloth = true;
		var cinc = new Cincture ( data );		
		this.root.add( cinc.mesh );
		
		
		//dr.x = 0;

		cinc.data.bones[0].position.set( dp.x, dp.y, dp.z );
		cinc.data.bones[0].rotation.set( dr.x, dr.y, dr.z );

		// cloth test
		var cloth_data = Object.assign( {}, data );
		for( let ni = 0; ni < cloth_data.nodes.length; ni++) cloth_data.nodes[ ni ] *= 1.1;
		cloth_data.material = tmat( 'images/stones.jpg' );
		cloth_data.start_angle = 0;
		cloth_data.cinc_angle = 180;
		cloth_data.subnodes = 0;
		cloth_data.subcincs = 0;
		cloth_data.closed = false;
		//cloth_data.helpers = this.helpers;
		cloth_data.material.side = THREE.DoubleSide;
		cloth_data.cloth = true;
		cloth_data.clamp_cinc = { begin: 1, end: 11 };
		cloth_data.cap =  { begin: false, end: false };
		cloth_data.skeleton = cinc.data.skeleton;

		var cloth = new Cincture ( cloth_data );
		
		cinc.mesh.add( cloth.mesh );
		cloth.mesh.bind( cloth.data.skeleton );

		this.test = cinc;
		this.add_bones_to_joints_list( this.test );
	}

	simple_men() {
		
		let wire_mat = mat('wire');
		let skin_mat = mat( 'phong', rgb(229, 220, 206));
		let hairs_mat1 = mat( 'phong', rgb(199, 190, 176) ); 
		let hairs_mat2 = mat( 'phong', rgb(51, 41, 34) ); 
			// hairs_mat1.side = THREE.DoubleSide;
			// hairs_mat2.side = THREE.DoubleSide;

		let mat_00 = mat( 'phong', rgb( 149, 163, 145 ) ); 
		let mat_01 = mat( 'phong', rgb( 78, 96, 124 ) ); 
		let mat_02 = mat( 'phong', rgb( 159, 163, 145 ) ); 
		let mat_10 = tmat( 'images/test00.jpg' );

		//
		// wires
		// skin_mat = wire_mat;
		// hairs_mat1 = wire_mat;
		// hairs_mat2 = wire_mat;
		// mat_00 = wire_mat;
		// mat_01 = wire_mat;
		// mat_02 = wire_mat;

		this.torso = this.simple_torso( mat_00 );
		this.head = this.simple_head( skin_mat );
		this.hairs = this.simple_hairs( hairs_mat1, hairs_mat2 );
		this.hairs1 = this.simple_hairs1( this.head, hairs_mat1, hairs_mat2 );
		
		this.l_leg = this.simple_leg( V( 0, 0.05, -0.07 ), V( 0, 0, Math.PI ), +1, mat_01 );
		this.r_leg = this.simple_leg( V( 0, 0.05, +0.07 ), V( 0, 0, Math.PI ), -1, mat_01 );
		
		this.l_arm = this.simple_arm( V( 0, -0.01, -0.00 ), V( -Math.PI/1.7, 0, 0 ), +1, mat_02  );
		this.r_arm = this.simple_arm( V( 0, -0.01, +0.00 ), V( +Math.PI/1.7, 0, 0 ), -1, mat_02  );
		
		this.root.add( this.torso.mesh );
		
		this.torso.last_bone().add ( this.head.mesh );

		this.torso.first_bone().add( this.l_leg.mesh );
		this.torso.first_bone().add( this.r_leg.mesh );
		
		this.torso.last_bone().add( this.l_arm.mesh );
		this.torso.last_bone().add( this.r_arm.mesh );

		let size = 0.01;
		
		this.add_joint( this.torso,	
			['torso0', 'torso1', 'torso2', 'torso3', 'torso4', 'torso5', 'torso6'], red, size );
		
		this.add_joint( this.head, 	
			[ud, ud, 'head0', ud, 'head2'], red, size );
		
		this.add_joint( this.l_arm,	
			['l_arm0', ud, ud, 'l_arm1', ud, ud, ud, ud, ud, ud, ud, 'l_arm2', ud, ud, ud, 'l_arm3'], white, size );
		
		this.add_joint( this.r_arm,	
			['r_arm0', ud, ud, 'r_arm1', ud, ud, ud, ud, ud, ud, ud, 'r_arm2', ud, ud, ud, 'r_arm3'], black, size );

		this.add_joint( this.l_leg,	
			['l_leg0', ud, ud, 'l_leg1', 'l_leg1', ud, ud, 'l_leg2'], white, size );

		this.add_joint( this.r_leg,	
			['r_leg0', ud, ud, 'r_leg1', 'r_leg1', ud, ud, 'r_leg2'], black, size );

		this.joints.print();

		this.root.position.set ( 0, 0.8, 0 );
	}

	//#region  joints
	add_joint( root, names, color, size ) {

		for( let i = 0; i < names.length; i++ )	root.data.bones[i].name = names[i];
		List.add_named_items( root.data.bones, this.joints );

		let material = mat( 'basic', color );
		let wire_material = mat( 'basic', color );
		wire_material.wireframe = true;
		wire_material.wireframeLinewidth = 0.01;

		for( let i = 0; i < names.length; i++ )	{
			let _material = material;
			let _size = size;
			let _div = 8;
			if( names[i] == undefined ) { _material = wire_material; _size = size / 4; _div = 2; }
			let marker = sphere( _size, V0, V0, _material, false, _div );
				marker.renderOrder = 999;
				marker.onBeforeRender = function( renderer ) { renderer.clearDepth(); };
			root.data.bones[i].add( marker );
			this.markers.push( marker );
		}
	}

	get_joints_state() {//} = new Vector3( 1, 1, 1 ) ) {
		
		//log( k, false );
		if( this.joints.items.length == 0 ) { log( 'No joints to get' ); return; }
		
		let state = [];
		this.joints.items.forEach( joint => {
			let joint_state = {	
				name: joint.name, 
				rotation: new THREE.Vector3( joint.rotation.x, joint.rotation.y, joint.rotation.z )
			};
			//log( js(joint_state), false );
			state.push( joint_state );
		});
		//log();
		return state;
	}

	set_joints_state( state ) {
		
		if( state.length == 0 ) { log( 'No state records found' ); return; }
		if( this.joints.items.length == 0 ) { log( 'No joints to set' ); return; }
		
		state.forEach( item => {
			let joint = this.joints.find( item.name );
			if( joint != undefined ) {
				//log( item.name + ' joint restored');
				joint.rotation.set( item.rotation.x, item.rotation.y, item.rotation.z );
			}
			//else log( item.name + ' joint not found');
		});
	}

	show_joint( name ) {
		this.joints.items.forEach( joint => {
			if( joint.name == name ) joint.re
		});
	}
	//#endregion joints

	//#region controls
	update_mouse() {

		if( Keyboard.ctrl[0] == false ) {
			
			// rotate camera
			if( Keyboard.ctrl[0] == false && Mouse.buttons[0] == 1 && App.mid_fps != 0 ) {
				App.camera.target.rotation.y -= Mouse.mdx / App.fps.fps;
				App.camera.target.rotation.z -= Mouse.mdy / App.fps.fps;
			}

			// wheel
			if( Mouse.wheel != 0 ) {
				let aj = this.joints.item();
				let jef = false;
				if( aj != undefined ) {
					if( Keyboard.key_time('X') > 0 ) { aj.rotation.x += Mouse.wheel / 500; jef = true; }
					if( Keyboard.key_time('Y') > 0 ) { aj.rotation.y += Mouse.wheel / 500; jef = true; }
					if( Keyboard.key_time('Z') > 0 ) { aj.rotation.z += Mouse.wheel / 500; jef = true; }
				}
				
				if( jef == false ) {
					App.camera.position.x += Mouse.wheel / 10;
					if( App.camera.position.x > -1 ) App.camera.position.x = -1;
				}
			}
		}
	}

	update_keyboard() {
		if ( Keyboard.key_time('W') > 0 ) { this.root.translateX( +0.1 ); this.save(); }
		if ( Keyboard.key_time('S') > 0 ) { this.root.translateX( -0.1 ); this.save(); }
		if ( Keyboard.key_time('A') > 0 ) { this.root.rotateY( +0.1 ); this.save(); }
		if ( Keyboard.key_time('D') > 0 ) { this.root.rotateY( -0.1 ); this.save(); }	
	}
	//#endregion controls

	save( sharing = 'all' ) {
		App.hub.send_vector( App.hub.name, 'root.position', App.avatar.root.position, sharing );
		App.hub.send_vector( App.hub.name, 'root.rotation', App.avatar.root.rotation, sharing );
	}

    update () {
		this.update_mouse();
		this.update_keyboard();
		//this.update_markers( this.test.data.bones[1] );
    }

	torso_rotate( step = V0 ) {
		
		if(this.torso == undefined) return;

		if (App.act.id('up') != -1) return;
		App.act.add( 'up',
			{
				this: this,
				step: step,
				update: function(data) {

					if (data.counter == undefined) data.counter = 3;

					for (var i = 0; i < data.this.torso.data.bones.length; i++) {
						let bone = data.this.torso.data.bones[i];
						bone.rotation.x += this.step.x;
						bone.rotation.y += this.step.y;
						bone.rotation.z += this.step.z;
					}

					for (var i = 0; i < 2; i++) {
						let bone = data.this.head.data.bones[i];
						bone.rotation.x += this.step.x;
						bone.rotation.y += this.step.y;
						bone.rotation.z += this.step.z;
					}
					
					for (var i = 0; i < data.this.l_leg.data.bones.length; i++) {
						let bone = data.this.l_leg.data.bones[i];
						//bone.rotation.x -= this.step.x;
						bone.rotation.y -= this.step.y;
						bone.rotation.z -= this.step.z;
					}

					for (var i = 0; i < data.this.r_leg.data.bones.length; i++) {
						let bone = data.this.r_leg.data.bones[i];
						//bone.rotation.x -= this.step.x;
						bone.rotation.y -= this.step.y;
						bone.rotation.z -= this.step.z;
					}

					data.this.r_arm.data.bones[0].rotation.z += 1 * this.step.y;
					data.this.l_arm.data.bones[0].rotation.z -= 1 * this.step.y;

					data.this.head.data.bones[0].rotation.y += this.step.y;

					// data.this.r_arm.bones[2].rotation.z += 2 * this.step.y;
					// data.this.l_arm.bones[2].rotation.z += 2 * this.step.y;

					if (data.counter == 0) App.act.del('up');
					data.counter--;

					//App.act.del('up');
				}
			}
		);
	}

	test_rotate( step = V0 ) {
		
		if(this.test == undefined) return;

		if (App.act.id('test') != -1) return;
		App.act.add( 'test',
			{
				this: this,
				step: step,
				update: function( data ) {

					if ( data.counter == undefined ) data.counter = 3;

					for ( var i = 0; i < data.this.test.data.bones.length; i++ ) {
						let bone = data.this.test.data.bones[i];
						bone.rotation.x += this.step.x;
						bone.rotation.y += this.step.y;
						bone.rotation.z += this.step.z;
					}

					if ( data.counter == 0 ) App.act.del( 'test' );
					data.counter--;

					App.act.del( 'test' );
				}
			}
		);
	}

	simple_head ( mat ) {
		
		var data = Object.assign( {}, default_cincture_data );
		
		{
			data.offsets = 
			[	
				0.000,   0.000,   0.000,
			    0.008,   0.023,   0.000,
				0.008,   0.023,   0.000,
				0.010,   0.060,   0.000,
				0.000,   0.070,   0.000,
			   -0.005,   0.070,   0.000,
			   -0.000,   0.050,   0.000
			]

			data.rotates = 
			[	
				0.00,   0.00,   0.00,
				0.00,   0.00,   0.00,
				0.00,   0.00,   0.00,
				0.00,   0.00,  -0.30,
				0.00,   0.00,  +0.20,
				0.00,   0.00,  +0.15,
				0.00,   0.00,  +0.10
			];

			data.nodes = 
			[	
				0.060,	0.055,	0.060,	0.062,   0.060,   0.055,
				0.060,	0.055,	0.060,	0.062,   0.060,   0.055,	
				0.060,	0.055,	0.060,	0.062,   0.060,   0.055,	
				0.090,	0.080,	0.075,	0.110,   0.075,   0.080,
				0.110,	0.095,	0.085,	0.115,   0.085,   0.095,
				0.095,	0.080,	0.075,	0.110,   0.075,   0.080,		
				0.035,	0.025,	0.020,	0.020,   0.020,   0.025
			];
		}	

		data.name = 'head';
		data.scale = 0.77;
		data.start_angle = 180;
		data.smooth = { normals: 1, vertices: 1 };
		data.subnodes = 1;
		data.subcincs = 1;
		//data.helpers = 0.0001;
		data.cap_curve = { begin: 2, end: 2 };
		data.material = mat;
		//data.uv = { x: 0, y: 0, height: 1, width: 1 };
		let cinc = new Cincture ( data );
		//cinc.data.bones[0].position.set( -0.01, -0.018, 0 );
		return cinc;
	}

	simple_curl ( width, length, div, crop, material, r, p, _r, _p ) {
		
		var offsets = [ ];
		var rotates = [ ];
		var nodes =   [ ];

		let hw = width / 2;
		let sw = hw / div * crop;

		for( let i = 0; i < div; i++ ) {
			if (i == 0) offsets.push( 0, 0, 0 );  
			else offsets.push( p[0] / div, p[1] / div + length / div, p[2] / div ); 
			rotates.push( r[0] / div, r[1] / div, r[2] / div );
			nodes.push( hw - i * sw, hw - i * sw );
		}

		var data = Object.assign( {}, default_cincture_data );
			data.offsets = offsets;
			data.rotates = rotates;
			data.nodes = nodes;
			data.smooth = { normals: 1, vertices: 1 };
			data.material = material;

		var cinc = new Cincture ( data );
		cinc.data.bones[0].rotation.set( _r[0], _r[1], _r[2] );
		cinc.data.bones[0].position.set( _p[0], _p[1], _p[2] );
		return cinc;
	}
	
	simple_hairs ( mat1, mat2 ) {
		
		var data = Object.assign( {}, default_cincture_data );
		
		{
			data.offsets = 
			[	
			   -0.045,  -0.510,   0.000,
			   -0.020,   0.095,   0.000,
			    0.015,   0.040,   0.000,
			    0.005,   0.040,   0.000
			]

			data.rotates = 
			[	
				0.00,   0.00,  +0.05,
				0.00,   0.00,  +0.05,
				0.00,   0.00,  +0.05,
				0.00,   0.00,  +0.05
			];

			data.nodes = 
			[	
				0.070,	0.065,	0.035,	0.025,   0.035,   0.065,
				0.090,	0.085,	0.075,	0.100,   0.075,   0.085,
				0.095,	0.080,	0.085,	0.120,   0.085,   0.080,		
				0.045,	0.040,	0.035,	0.040,   0.035,   0.040
			];
		}	

		data.name = 'hairs';
		data.scale = 0.80;
		data.start_angle = 180;
		data.smooth = { normals: 1, vertices: 1 };
		data.subnodes = 1;
		data.subcincs = 1;
		data.cbegin = false;
		//data.helpers = 0.0001;
		data.cap_curve = { begin: 1, end: 2 };
		data.material = mat1;
		//data.uv = { x: 0, y: 0, height: 1, width: 1 };
		let cinc = new Cincture ( data );
		//cinc.data.bones[0].position.set( -0.01, -0.018, 0 );
		
		var root = this.head.last_bone();
		root.add(cinc.mesh);
		//return cinc;
	}

	simple_hairs2 ( mat1, mat2 ) {
		
		var data = Object.assign( {}, default_cincture_data );
		
		{
			data.offsets = 
			[	
			   -0.105,  -0.385,   0.000,
			   -0.005,   0.070,   0.000,
			   -0.000,   0.050,   0.000
			]

			data.rotates = 
			[	
				0.00,   0.00,  +0.55,
				0.00,   0.00,  +0.15,
				0.00,   0.00,  +0.10
			];

			data.nodes = 
			[	
				0.110,	0.095,	0.085,	0.115,   0.085,   0.095,
				0.095,	0.080,	0.075,	0.110,   0.075,   0.080,		
				0.035,	0.025,	0.020,	0.020,   0.020,   0.025
			];
		}	

		data.name = 'hairs';
		data.scale = 0.75;
		data.start_angle = 180;
		data.smooth = { normals: 1, vertices: 1 };
		data.subnodes = 1;
		data.subcincs = 1;
		data.cbegin = false;
		//data.helpers = 0.0001;
		data.cap_curve = { begin: -3, end: 2 };
		data.material = mat1;
		//data.uv = { x: 0, y: 0, height: 1, width: 1 };
		let cinc = new Cincture ( data );
		//cinc.data.bones[0].position.set( -0.01, -0.018, 0 );
		
		var root = this.head.last_bone();
		root.add(cinc.mesh);
		//return cinc;
	}

	simple_hairs1 ( head, mat1, mat2 ) {
		return;

		var root = head.last_bone();
		
		// up
		root.add( this.simple_curl( 0.09, 0.14, 10, 0.9, mat1, [1.7, 0, 0], [0, 0, 0], [1.4, 0.3, 0.8], [-0.04, -0.01, 0.01] ).mesh );
		// root.add( this.simple_curl( 0.09, 0.14, 10, 0.9, mat1, [1.7, 0, 0], [0, 0, 0], [1.4, 0.3, 0.8], [-0.04, -0.01, 0.01] ).mesh );
		// root.add( this.simple_curl( 0.09, 0.14, 10, 0.9, mat1, [1.7, 0, 0], [0, 0, 0], [1.4, 0.2, 0.4], [0.0, 0.01, 0.01] ).mesh );
		// root.add( this.simple_curl( 0.09, 0.14, 10, 0.9, mat1, [1.7, 0, 0], [0, 0, 0], [1.4, 0, 0], [0.02, 0.01, 0.01] ).mesh );
		// root.add( this.simple_curl( 0.09, 0.14, 10, 0.9, mat1, [1.7, 0, 0], [0, 0, 0], [1.4, -0.2, -0.4], [0.04, 0.01, 0.01] ).mesh );

		// // down right
		// root.add( this.simple_curl( 0.05, 0.10, 10, 0.5, mat2, [0.50, 0, 0], [0, 0, 0], [2.8, 0.0, -0.4], [ 0.00, -0.03, 0.065] ).mesh );
		// root.add( this.simple_curl( 0.05, 0.13, 10, 0.2, mat2, [0.55, 0, 0], [0, 0, 0], [2.9, 0.4,  0.2], [-0.02, -0.04, 0.065] ).mesh );
		// root.add( this.simple_curl( 0.05, 0.11, 10, 0.5, mat2, [0.55, 0, 0], [0, 0, 0], [2.7, 0.9,  0.2], [-0.05, -0.05, 0.050] ).mesh );

		// // down left
		// root.add( this.simple_curl( 0.05, 0.10, 10, 0.5, mat2, [0.50, 0, 0], [0, 0, 0], [-2.8, 0.0, -0.4], [ 0.00, -0.03, -0.065] ).mesh );
		// root.add( this.simple_curl( 0.05, 0.13, 10, 0.2, mat2, [0.55, 0, 0], [0, 0, 0], [-2.9, 0.4,  0.2], [-0.02, -0.04, -0.065] ).mesh );
		// root.add( this.simple_curl( 0.05, 0.11, 10, 0.5, mat2, [0.55, 0, 0], [0, 0, 0], [-2.7, 0.9,  0.2], [-0.05, -0.05, -0.050] ).mesh );
	}

	simple_arm ( dp, dr, mirror, mat ) {
		
		var data = Object.assign( {}, default_cincture_data );
		
		{
			data.offsets = 
			[	
				0.00,   0.00,	0.00,
				0.00,   0.15,	0.00,
				0.00,   0.05,	0.00,
				0.00,   0.10,	0.00,
				0.00,   0.00,	0.00,
				0.00,   0.10,	0.00, 
				0.00,   0.05,	0.00,
				0.00,   0.18,	0.00,
				0.00,   0.04,	0.00
			];
			data.rotates = 
			[	
				0.00,   0.00,	0.00,
			   -0.20,   0.00,   0.00,
			   -0.40,   0.00,   0.00,
			   -0.40,   0.00,   0.00,
				0.00,   0.00,	0.00,
				0.00,   0.00,	0.00,
				0.00,  -0.10,	0.00,
			   -0.20,  -0.10,	0.00,
			   -0.20,  -0.00,	0.00
			];
			data.nodes = 
			[	
				0.02,	0.02,	0.02,	0.02,	0.02,	0.02,	0.02,	0.02,
				0.05,	0.05,	0.05,	0.05,	0.05,	0.05,	0.05,	0.05,
				0.05,	0.05,	0.05,	0.055,	0.06,	0.055,	0.05,	0.05,
				0.05,	0.05,	0.05,	0.05,	0.05,	0.05,	0.05,	0.05,
				0.04,	0.04,	0.04,	0.04,	0.04,	0.04,	0.04,	0.04,
				0.03,	0.03,	0.03,	0.03,	0.03,	0.03,	0.03,	0.03,
				0.04,	0.04,	0.04,	0.04,	0.04,	0.04,	0.04,	0.04,
				0.02,	0.02,	0.02,	0.02,	0.02,	0.02,	0.02,	0.02,
				0.03,	0.02,	0.01,	0.02,	0.02,	0.02,	0.01,	0.02
			];
		}

		if( mirror == +1) data.name = 'left_arm';
		if( mirror == -1) data.name = 'right_arm';
		data.mirror = mirror;
		data.smooth = { normals: 1, vertices: 1 };
		data.subnodes = 1;
		data.subcincs = 1;
		data.material = mat;
		//data.material = tmat('images/test00.jpg');

		var cinc = new Cincture ( data );
		cinc.data.bones[0].position.set( dp.x, dp.y, dp.z );
		cinc.data.bones[0].rotation.set( dr.x, dr.y, dr.z );
		return cinc;
	}

	simple_torso ( mat ) {
		
		var data = Object.assign( {}, default_cincture_data );
		
		{
			data.offsets = 
			[	
				0.00,  -0.05,	0.00,
				0.00,   0.12,	0.00,
				0.00,   0.20,	0.00,
				0.00,   0.20,	0.00,
				0.00,   0.05,	0.00
			];
			data.nodes = 
			[	
				0.10,	0.12,	0.16,	0.14,	0.10,
				0.10,	0.12,	0.16,	0.14,	0.10,
				0.10,	0.12,	0.16,	0.13,	0.10,
				0.07,	0.09,	0.15,	0.12,	0.09,
				0.05,	0.05,	0.05,	0.05,	0.05,
			];
		}

		data.name = 'torso';
		data.cap.begin = false;
		data.smooth = { normals: 1, vertices: 1 };
		data.subnodes = 1;
		data.subcincs = 1;
		data.cinc_angle = 180;
		data.symmetry = true;
		data.material = mat;
		//data.helpers = 0.0001;

        var cinc = new Cincture ( data );
		return cinc;
	}

	simple_leg ( dp, dr, mirror, mat ) {
		
		var data = Object.assign( {}, default_cincture_data );
		
		{
			data.offsets = 
			[	
				0.00,   0.00,	0.00,
				0.00,   0.31,  -0.02,
				0.00,   0.10,  -0.01,
				0.00,   0.31,  -0.02,
				0.00,   0.10,   0.00
			];
			data.rotates = 
			[	
				0.00,   0.00,	0.00,
				0.00,   0.00,	0.00,
				0.00,   0.00,	0.00,
				0.00,   0.00,	0.00,
				0.00,  -0.20,	0.00
			];
			data.nodes = 
			[	
				0.07,	0.11,	0.09,	0.11,	0.07,	0.07,	0.07,	0.07,
				0.06,	0.06,	0.05,	0.08,	0.08,	0.07,	0.07,	0.06,
				0.05,	0.04,	0.05,	0.07,	0.07,	0.07,	0.05,	0.04,
				0.07,	0.06,	0.05,	0.06,	0.06,	0.06,	0.05,	0.07,
				0.07,	0.05,	0.06,	0.08,	0.16,	0.08,	0.06,	0.05,
			];
		}

		if( mirror == +1) data.name = 'left_leg';
		if( mirror == -1) data.name = 'right_leg';
		data.mirror = mirror;
		data.smooth = { normals: 1, vertices: 1 };
		data.subnodes = 1;
		data.subcincs = 1;
		data.material = mat;
		//data.material = tmat('images/test00.jpg');

		var cinc = new Cincture ( data );
		cinc.data.bones[0].position.set( dp.x, dp.y, dp.z );
		cinc.data.bones[0].rotation.set( dr.x, dr.y, dr.z );
		return cinc;
    }
}