'use strict';

module.exports = function(grunt) {
  grunt.registerTask('deploy', 'Run sub tasks', function() {
    var options = this.options({
      atBegin: [],
      atEnd: [],
      targets: {}
    });

    function runTask(task) {
      if (task) { grunt.task.run(task); }
    }

    function notifyDeployTarget(target) {
      grunt.log.writeln('Deploying: ' + target);
    }

    function runDeployTasks(target) {
      if (target in options.targets) {
        var targetTasks = options.targets[target].tasks;
        notifyDeployTarget(target);
        targetTasks.forEach(runTask);
      }
    }

    ////////////////////////////////////

    // before hook
    options.atBegin.forEach(runTask);

    ////////////////////////////////////

    if (!this.args.length) {
      throw new Error('no targets');
    }

    // run specified tasks
    this.args.forEach(runDeployTasks);

    ////////////////////////////////////

    // after hook
    options.atEnd.forEach(runTask);

    ////////////////////////////////////

  }, this);
};
