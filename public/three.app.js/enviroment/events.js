class Events {

	static init () {
		Events.items = [];
		Events.debug_info = false;
	}

	static bind( type, action, keys = undefined, object = undefined ) {
		
		if( Events.debug_info ) log( js( action ) );

		let func = undefined;
		let context = undefined;

		// convert string function name or function to function
		if( action.includes( 'function' ) ) 
			eval( "action =" + action );
		else {
			func = action.split('.').pop();
			context = action.replace( '.' + func, '' );
			func = action;
			action = undefined;
		}
		
		let event = {
			type: type,
			keys: keys,
			action: action,
			func: func,
			context: context,
			object: object
		};

		Events.items.push ( event );
	}

	static run( event ) {
		for( let i = 0; i < Events.items.length; i++ ) 
			if( Events.items[i].type == event.type ) 
				for( let j = 0; j < Events.items[i].keys.length; j++ ) {
					let key = Events.items[i].keys[j].replace(' ', '').split('+')[0];
					let ctrl = Events.items[i].keys[j].includes('ctrl');
					let alt = Events.items[i].keys[j].includes('alt');
					if( ( key == event.key && alt == event.altKey && ctrl == event.ctrlKey ) || 
						Events.items[i].keys == undefined ) {
						if( Events.debug_info ) log( 'run event ' + js( event ) );
						if( Events.items[i].action == undefined ) {
							let action = eval( Events.items[i].func ).bind( eval( Events.items[i].context ) );
							action( Events.items[i].object );

						} else 
							Events.items[i].action( Events.items[i].object );
					}
				}
	}
}