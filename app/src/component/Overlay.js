/*
 @example

 // js
 import Overlay from './component/Overlay';

 let overlay = new Overlay({
 clickCallback: function(evt) {
 console.log('evt :', evt);
 }
 }).init();

 overlay.show();

 // set node event handler
 // overlay.setNodeEventHandler(true/false);

 // get node
 // console.log(overlay.getNode());

 // set css
 // overlay.setCss({'background-color': '#f00', ...});

 // append to other element
 // overlay.appendTo(parent element);

 // show overlay
 // overlay.show();

 // hide overlay
 // overlay.hide();

 // destroy overlay
 // overlay.destroy();
 */

import Rx from 'rxjs/Rx';
import { isFunction } from '../utils/util';

class Overlay {
  constructor(options) {
    const _ = this;

    _.option = $.extend({
      class: 'overlay',
      color: '#000',
      opacity: 0.5,
      appendTo: $('body'),
      clickCallback: null
    }, options);

    _.node = null;

    _.parentNode = _.option.appendTo;

    _.clickOverlay$ = null;
    _.subscribe = null;
  }

  init() {
    const _ = this;

    _.node = $(document.createElement('div')).addClass(_.option.class);

    _.node.css({
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      'background-color': _.option.color,
      opacity: _.option.opacity,
      filter: `alpha(opacity=${_.option.opacity * 100})`
    });

    _.parentNode.append(_.node);

    _.hide();

    _.clickOverlay$ = Rx.Observable.fromEvent(_.node, 'click');

    _.setNodeEventHandler(true);

    return _;
  }

  setNodeEventHandler(flag) {
    const _ = this;

    if (_.subscribe) {
      _.subscribe.unsubscribe();
      _.subscribe = null;
    }

    if (flag === true) {
      _.subscribe = _.clickOverlay$.subscribe(evt => {
        if (isFunction(_.option.clickCallback)) _.option.clickCallback(evt);
      });
    } 

    return _;
  }

  getNode() {
    return this.node;
  }

  setCss(obj) {
    const _ = this;

    if (_.node.length > 0) _.node.css(obj);

    return _;
  }

  appendTo(element) {
    const _ = this;

    _.parentNode = _.option.appendTo = $(element);
    _.parentNode.append(_.node);

    return _;
  }

  show() {
    const _ = this;

    if (_.node.length > 0) _.node.show();

    return _;
  }

  hide() {
    const _ = this;

    if (_.node.length > 0) _.node.hide();

    return _;
  }

  destroy(obj) {
    const _ = this;

    /*
    obj = $.extend({
      isRemoveNode: true
    }, obj);

    _.setNodeEventHandler(false);

    if (obj.isRemoveNode) $(_.node).remove();

    _.option = null;
    _.node = null;
    _.parentNode = null;
    */

    return _;
  }
}

export default Overlay;