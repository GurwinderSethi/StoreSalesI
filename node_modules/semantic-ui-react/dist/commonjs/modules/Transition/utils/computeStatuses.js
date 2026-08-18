"use strict";

exports.__esModule = true;
exports.TRANSITION_STATUS_UNMOUNTED = exports.TRANSITION_STATUS_INITIAL = exports.TRANSITION_STATUS_EXITING = exports.TRANSITION_STATUS_EXITED = exports.TRANSITION_STATUS_ENTERING = exports.TRANSITION_STATUS_ENTERED = void 0;
exports.computeStatuses = computeStatuses;
var TRANSITION_STATUS_INITIAL = exports.TRANSITION_STATUS_INITIAL = 'INITIAL';
var TRANSITION_STATUS_ENTERED = exports.TRANSITION_STATUS_ENTERED = 'ENTERED';
var TRANSITION_STATUS_ENTERING = exports.TRANSITION_STATUS_ENTERING = 'ENTERING';
var TRANSITION_STATUS_EXITED = exports.TRANSITION_STATUS_EXITED = 'EXITED';
var TRANSITION_STATUS_EXITING = exports.TRANSITION_STATUS_EXITING = 'EXITING';
var TRANSITION_STATUS_UNMOUNTED = exports.TRANSITION_STATUS_UNMOUNTED = 'UNMOUNTED';

/**
 * @param {Object} [options]
 * @param {String} [options.status]
 * @param {Boolean} [options.mountOnShow]
 * @param {Boolean} [options.transitionOnMount]
 * @param {Boolean} [options.visible]
 * @param {Boolean} [options.unmountOnHide]
 */
function computeStatuses(options) {
  var mountOnShow = options.mountOnShow,
    status = options.status,
    transitionOnMount = options.transitionOnMount,
    visible = options.visible,
    unmountOnHide = options.unmountOnHide;
  if (visible) {
    if (status === TRANSITION_STATUS_INITIAL) {
      if (transitionOnMount) {
        return {
          animating: true,
          status: TRANSITION_STATUS_ENTERING,
          nextStatus: TRANSITION_STATUS_ENTERED
        };
      }
      return {
        animating: false,
        status: TRANSITION_STATUS_ENTERED,
        nextStatus: undefined
      };
    }
    if (status === TRANSITION_STATUS_UNMOUNTED) {
      return {
        animating: true,
        status: TRANSITION_STATUS_ENTERING,
        nextStatus: TRANSITION_STATUS_ENTERED
      };
    }
    if (status === TRANSITION_STATUS_EXITED || status === TRANSITION_STATUS_EXITING) {
      return {
        animating: true,
        status: TRANSITION_STATUS_ENTERING,
        nextStatus: TRANSITION_STATUS_ENTERED
      };
    }
    if (status === TRANSITION_STATUS_ENTERING) {
      return {};
    }

    /* istanbul ignore else */
    if (status === TRANSITION_STATUS_ENTERED) {
      return {
        animating: false,
        status: TRANSITION_STATUS_ENTERED,
        nextStatus: undefined
      };
    }
  }
  if (status === TRANSITION_STATUS_INITIAL) {
    if (mountOnShow || unmountOnHide) {
      return {
        animating: false,
        status: TRANSITION_STATUS_UNMOUNTED,
        nextStatus: undefined
      };
    }
    return {
      animating: false,
      status: TRANSITION_STATUS_EXITED,
      nextStatus: undefined
    };
  }
  if (status === TRANSITION_STATUS_ENTERED || status === TRANSITION_STATUS_ENTERING) {
    return {
      animating: true,
      status: TRANSITION_STATUS_EXITING,
      nextStatus: unmountOnHide ? TRANSITION_STATUS_UNMOUNTED : TRANSITION_STATUS_EXITED
    };
  }
  if (status === TRANSITION_STATUS_EXITING) {
    return {};
  }
  if (status === TRANSITION_STATUS_EXITED) {
    return {
      animating: false,
      status: TRANSITION_STATUS_EXITED,
      nextStatus: undefined
    };
  }

  /* istanbul ignore else */
  if (status === TRANSITION_STATUS_UNMOUNTED) {
    return {
      animating: false,
      status: TRANSITION_STATUS_UNMOUNTED,
      nextStatus: undefined
    };
  }

  /* istanbul ignore next */
  throw new Error("Transition:computeStatuses(): an unexpected status transition: { visible: " + visible + ", status: " + status + " }");
}