"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/CourseApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
    createCourse: function(course) {
        var newCourse = CourseApi.saveCourse(course);
        // Hey disaptcher, go tell all the stores that a course was just created
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_COURSE,
            course: newCourse
        });
    },

    deleteCourse: function(id) {
        CourseApi.deleteCourse(id);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_COURSE,
            id: id
        });
    },

    updateCourse: function(course) {
        var updatedCourse = CourseApi.saveCourse(course);
        // Hey disaptcher, go tell all the stores that a course was just updated
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_COURSE,
            course: updatedCourse
        });
    }
};

module.exports = CourseActions;
