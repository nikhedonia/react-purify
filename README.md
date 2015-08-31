# react-purify

This handy ES7 decorators makes it easy to implement (or migrate gradually) 
your react-components to a flux-like architecture.
Goal of this library is empowering users to purify components quickly without breaking existing architectures. 

## mixins :

```js
import {pure,mix} form 'react-purify'

@pure() // pureRenderMixin
class MyPureComponent extends React.Component {
 //...
}

//if you need more mixins :
@mix([LinkedStateMixin,PureRenderMixins,...])
class MyComp {
  //...
}

```

## ready to use component-factories

```js
import {UI,pureUI} form 'react-purify'

const MyPureComponent = pureUI( p=> (<h1>{p.title} </h1>) ); 
const MyImpureComponent = UI( p=>(<h1> {globalState} </h1>) );

```

## context-helpers

```js

var appState={todo:[/*...*/]};

import {inject,use} form 'react-purify'

@inject({appState}) // or @inject({appState:appState})
class TodoApp {
  render(){
     return <TodoList />
  }
}

@use( // transfers context to props
  ['appState'], //get the appState
  p=>({ //extract component dependencies
    todo:p.appState.todo
  })
)
@pure() // lets only redraw if todos have changed
class TodoList {
  render(){
     return <ul>{this.props.todo.map( (todo,k)=> <li key={k} >{todo}</li> )}</ul>
  }
}

//The example above shows how you can gradually move dependencies. Following code is equivallent :

@inject({appState}) 
@use(['appState'],p=>(
  {todo:p.appState.todo})
) 
class TodoApp {
  render(){
     return <TodoList {...this.props.todo}/>
  }
}

@pure()
class TodoList {
  render(){
     return <ul>{this.props.todo.map( (todo,k)=> <li key={k} >{todo}</li> )}</ul>
  }
}

```


