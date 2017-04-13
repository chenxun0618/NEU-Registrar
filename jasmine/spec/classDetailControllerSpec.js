describe("ClassDetailController", function() {
//  var app;

  var ctrl;
  var classService;
  var scheduleService;
  var location;
  var lwindow;
  var routeparams;




  //beforeEach(module('NEURegistrar'));
  beforeEach(angular.mock.module('NEURegistrar'));
 // beforeEach(module('ngRoute'));
  //  beforeEach(angular.mock.module('NEURegistrar').factory('ClassService'))
  //  beforeEach(angular.mock.module('NEURegistrar').ClassService);
  /*
  beforeEach(function() {
    app = angular.mock.module('NEURegistrar');
  })
  */

  beforeEach(inject(function($controller, $location, $window, $routeParams, $injector, ClassService, ScheduleService) {
        

        location = $location;
        lwindow = $window;
        lwindow.sessionStorage.loggedInUser = "true";
        

        routeparams = {unique_id : "41251"};
        classService = ClassService;
        scheduleService = ScheduleService;

      var schedule = ScheduleService.getScheduleDetail();
        lwindow.sessionStorage.schedule = JSON.stringify(schedule);

        ctrl = $controller('ClassDetailController', {
          $location : location,
          $window : lwindow,
          $routeParams : routeparams,
          ClassService : classService,
          ScheduleService : scheduleService
        });

    }));


  it("should pass an easy test", function() {
    
    //demonstrates use of custom matcher
    expect(1).toEqual(1);
  });



  it("should be defined", function() {

  //  classService = app.ClassService();

      expect(ctrl).toBeDefined();
  }) 

  it("should update location according to return motion", function() {
    ctrl.returnToSchedule();
    expect(location.url()).toEqual("/schedule-submission")
  })

  it("should update accordingly to save + return", function() {
    ctrl.saveAndReturnToSchedule();
    expect(location.url()).toEqual("/schedule-submission");
  })

  it("should update accordingly to save + return 2", function() {
    ctrl.class = {}
    var oldURL = location.url();
    ctrl.saveAndReturnToSchedule();
    expect(location.url()).toEqual(oldURL);
  })

  it("should display toast messages", function() {
    ctrl.toastMessage(1)
    expect(ctrl.toastMessage).toBeDefined();
  })

  it("should not display toast messages for bad inputs", function() {
    ctrl.toastMessage(0)
    expect(ctrl.toastMessage).toBeDefined();
  })

  it("should identify when it's not peak period", function() {
    expect(ctrl.isPeakPeriod("M","8")).toEqual(0);
  })

    it("should identify when it's not peak period (2)", function() {
    expect(ctrl.isPeakPeriod("W","8")).toEqual(0);
  })

  it("should identify when it's not peak period (3)", function() {
    expect(ctrl.isPeakPeriod("W","99999")).toEqual(0);
  })

    it("should identify when it's not peak period (4++)", function() {
    expect(ctrl.isPeakPeriod("R","8")).toEqual(0);
    expect(ctrl.isPeakPeriod("MW","8")).toEqual(0);
    expect(ctrl.isPeakPeriod("MWR","8")).toEqual(0);

  })

    it("should identify when it's peak period (1)", function() {
    expect(ctrl.isPeakPeriod("R","1515")).toEqual(1)

  })

    it("should identify when it's peak period (2)", function() {
    expect(ctrl.isPeakPeriod("MW","10")).toEqual(1);

  })

    it("should identify when it's peak period (3)", function() {
    expect(ctrl.isPeakPeriod("MWR","0925")).toEqual(1);

  })

    it("should identify when it's peak period (4)", function() {
    expect(ctrl.isPeakPeriod("T","15")).toEqual(1);

  })

  it("should identify when it's peak period (5)", function() {
    expect(ctrl.isPeakPeriod("T","12")).toEqual(1);

  })
      
  it("should identify when it's peak period (5)", function() {
    expect(ctrl.isPeakPeriod("T","0955")).toEqual(1);

  })  

  it("should update ending times on call", function() {
    ctrl.updateEndingTimes();
    var lisEnds = [ '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05' ];
    expect(ctrl.allMeetingEndTimes).toEqual(lisEnds);
  })

  it("should update meeting start times on changes", function() {
    ctrl.updateOnChangeOfTime(1);
    var lisEnds2 = [ '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05' ];
    expect(ctrl.allMeetingEndTimes).toEqual(lisEnds2);
  })

  it("should update meeting start times on changes (2)", function() {
    ctrl.updateOnChangeOfTime(0);
    var lisEnds3 = [ '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05' ];
    expect(ctrl.allMeetingEndTimes).toEqual(lisEnds3);
  })

  it("should extract target attributes accordingly (no local/total data)", function() {
    expect(ctrl.extractTargetAttributes(null, null, true, false)).toEqual(null);
  })

  it("should extract target attributes accordingly (several matches)", function() {
    expect(ctrl.extractTargetAttributes(1, 0, [[0,1],[0,2]], [0,1])).toEqual("1, 2");
  })

    it("should extract target attributes accordingly (no matches)", function() {
    expect(ctrl.extractTargetAttributes(1, 0, [[0,1],[0,2]], [5,6])).toEqual("(none)");
  })

    it("should extract target attributes accordingly (one match)", function() {
    expect(ctrl.extractTargetAttributes(1, 0, [[0,1],[1,2]], [0])).toEqual(1);
  })

  it("should distinguish attributes from different years (no attributes)", function() {
    expect(ctrl.differentFromLastYear("")).toEqual(false);
  })

  it("should distinguish attributes from different years (1 attribute)", function() {
    ctrl.class = {};
    ctrl.class[0] = [0,1];
    ctrl.class.old = {};
    ctrl.class.old[0] = [0,2];
    expect(ctrl.differentFromLastYear([0])).toEqual(true);
  })


});
