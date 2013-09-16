'use strict';

module.exports = function(grunt) {
  grunt.registerTask('deploy', 'Run sub tasks', function() {
    if (!this.args.length || this.args.length > 1) {
      throw new Error('Invalid targets: only one target can be set');
    }

    ////////////////////////////////////

    var options = this.options({
      atBegin: [],
      atEnd: [],
      targets: {}
    });

    var currentDeployTarget = this.args[0];

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

    // Set deploy env
    grunt.config.set('deploy.DEPLOY_TARGET', currentDeployTarget);
    process.env.DEPLOY_TARGET = currentDeployTarget;

    // before hook
    options.atBegin.forEach(runTask);

    ////////////////////////////////////

    // run specified tasks
    runDeployTasks(currentDeployTarget);

    ////////////////////////////////////

    // after hook
    options.atEnd.forEach(runTask);

    ////////////////////////////////////

  }, this);
};
