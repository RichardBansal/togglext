"use strict";
//CLNUP: Store entire task data and boolean to state whether it is active or not
app.factory("ActivetaskFactory",function(){
	return {
		data: undefined,
		active: false,
		set: false
	};
});

//NEXT: Update boolean based on stop, pause - check against the API for CREATE
//NEXT: Complete buttons, disable buttons, based on factory data
//NEXT: You should only have PLAY or PAUSE button, not both available to you

//FORMAT:
// { data:
//    { id: 220237503,
//      guid: '07a7c5b6-7a90-4e9a-b3a0-3d31d0fe72c1',
//      wid: 732811,
//      pid: 9302237,
//      billable: false,
//      start: '2015-04-15T20:20:25+00:00',
//      stop: '2015-04-15T20:20:30+00:00',
//      duration: 5,
//      description: 'Toggl Chrome Ext.',
//      duronly: false,
//      at: '2015-04-15T20:20:30+00:00',
//      uid: 1433757 } }