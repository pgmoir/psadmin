"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');
var _ = require('lodash');

var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getAuthors: function() {
        return [{firstName: "Phil", lastName: "Moir", id: "phil-moir"}, {firstName: "Cory", lastName: "House", id: "cory-house"}];
    },

    getInitialState: function() {
        return {
            course: { id: '', title: '', author: '', category: '', length: '', authors: this.getAuthors()},
            errors: {},
            dirty: false
        };  
    },

    componentWillMount: function() {
        var courseId = this.props.params.id; // from the path course courseId
        if (courseId) {
            var course = CourseStore.getCourseById(courseId);
            course.authors = this.getAuthors();
            this.setState({course: course});
        }
    },

    courseFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {}; // clear errors

        if (this.state.course.title.length < 5) {
            this.state.errors.title = 'Tit must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    setCourseState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.course[field] = value;
        return this.setState({course: this.state.course});
    },

    getCourseWithAuthor: function() {
        var author = _.find(this.state.course.authors, {id: this.state.course.authorId});
        var course = this.state.course;
        course.author = { id: author.id, name: author.firstName + ' ' + author.lastName };
        return course;
    },

    saveCourse: function(event) {
        event.preventDefault();

        this.setState({course: this.getCourseWithAuthor()});

        if (!this.courseFormIsValid()) {
            return;
        }

        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }
        this.setState({dirty: false});
        toastr.success('Course saved!');
        this.transitionTo('courses');
    },

    render: function() {
        return (
            <CourseForm 
                course={this.state.course} 
                onChange={this.setCourseState}
                onSave={this.saveCourse} 
                errors={this.state.errors} />
        );
    }
});

module.exports = ManageCoursePage;