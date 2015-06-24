import extend from 'extend'
import React from 'react/addons'

export const use = function(context,get=((x)=>x)){
  var Types = {};
  if(Array.isArray(context)){
    context.forEach((k)=>{
      Types[k]=React.PropTypes.any
    });
  }else{
    Types=context;
  }
  const wrapper =(Component) => {
    return class {
      static contextTypes = Types;
      constructor(){
        console.log('constructing use');
      }
      render() {
        return <Component {...this.props} {...get(this.context)} />;
      }
    };
  };

  return (this)?wrapper(this):wrapper;

};

export const compute = function(compute){
  const wrapper =(Component) => {
    return class {
      constructor(props){
        console.log('constructing compute');
        console.log('recompute',props);
        this.computed=compute(props);
      }
      componentWillUpdate(props){
        if( this::React.addons.PureRenderMixin.shouldComponentUpdate(props) ){
          console.log('recompute',props);
          this.computed=compute(props);
        }
      }
      render() {
        return <Component {...this.props} {...this.computed} />;
      }
    };
  };

  return (this)?wrapper(this):wrapper;

};

export const inject = function(context){

  const Types=Object.entries(context)
    .reduce((contextTypes, [k, v]) => {
      contextTypes[k] = React.PropTypes.any;
      return contextTypes;
    },{});


  const wrapper = (Component) => class {
    static childContextTypes = Types

    getChildContext() {
      return context;
    }

    render() {
      return <Component {...this.props} {...this.context} />;
    }
  };

  return (this)?wrapper(this):wrapper;

};


export const mix = function(mixins){
  const wrapper = (Component)=>{
    mixins.forEach( (mixin)=>
        extend(Component.prototype,mixin)
    );
    return Component;
  }

  return (this)?wrapper(this):wrapper;

};


export const pure = function(){
  return mix.call(this,[React.addons.PureRenderMixin]);
};

export const pureUI =( 
  (renderFunc)=> (
    @pure()
    class { 
      render(){ 
        return renderFunc.call(this,this.props); 
      } 
    }
  )
);

export const UI = ( 
  (renderFunc)=>(
    class { 
      render(){ 
        return renderFunc.call(this,this.props); 
      } 
    }
  )
);


