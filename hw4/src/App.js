import './App.css';
import './styles.css';
import delete_x from './img/x.png';
import React from 'react';

// eslint-disable-next-line no-unused-vars
class TodoHeader extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      items:[],
      item_complete:[],
      mode : [1,0,0],

    }
  }
  render(){


    let display;

    

    function count_uncomplete(item_complete){
      let count = 0;
      for(let i = 0;i<item_complete.length;i++){
        if (!item_complete[i]){
          count += 1;
        }
      }
      return count;
  }

    if(this.state.mode[0]){
      display = 
      <ul className='todo-app__list' id = 'todo-list'>
       {this.state.items.map( (items,index) => 
       <li 
         className='todo-app__item' 
         key = {index}>
         <div className='todo-app__checkbox' >
             <input id ={index} type = 'checkbox'
             onClick={
               () => {var buffer = [...this.state.item_complete];
                 buffer[index]= !buffer[index];
                 this.setState({item_complete:buffer})} 
             }
             checked = {this.state.item_complete[index]?true:false}
             ></input>
             <label htmlFor={index}></label>
         </div>
         
         {this.state.item_complete[index]
             ?<h1 className = 'todo-app__item-detail_complete'>{this.state.items[index]}</h1>
             :<h1 className = 'todo-app__item-detail'>{this.state.items[index]}</h1>}
             
         
         <img 
           src={delete_x} 
           className = 'todo-app__item-x' 
           key = {index}
           alt = 'who cares?'
           onClick = {(e) => {
             var array1 =  [...this.state.items]
             var array2 =  [...this.state.item_complete]
             array1.splice(index,1);
             array2.splice(index,1);
             console.log(index);
             this.setState({items:array1, item_complete:array2});
             }
           }
         ></img>
         </li>)}
      </ul>
      }
    
    if(this.state.mode[1]){
      display = 
      <ul className='todo-app__list' id = 'todo-list'>
        {this.state.items.map( (items,index) => {if(!this.state.item_complete[index]){ 
        console.log(!this.state.item_complete[index]);
         return(
           <li 
          className='todo-app__item' 
          key = {index}>
          <div className='todo-app__checkbox' >
              <input id ={index} type = 'checkbox'
              onClick={
                () => {var buffer = [...this.state.item_complete];
                  buffer[index]= !buffer[index];
                  this.setState({item_complete:buffer})} 
              }
              checked = {this.state.item_complete[index]?true:false}
              ></input>
              <label htmlFor={index}></label>
          </div>
          
          {this.state.item_complete[index]
              ?<h1 className = 'todo-app__item-detail_complete'>{this.state.items[index]}</h1>
              :<h1 className = 'todo-app__item-detail'>{this.state.items[index]}</h1>}
              
          
          <img 
            src={delete_x} 
            className = 'todo-app__item-x' 
            key = {index}
            alt = 'who cares?'
            onClick = {(e) => {
              var array1 =  [...this.state.items]
              var array2 =  [...this.state.item_complete]
              array1.splice(index,1);
              array2.splice(index,1);
              this.setState({items:array1, item_complete:array2});
              }
            }
          ></img>
          </li>
         )
        
          
    }
    })
  }
    
      </ul>
      }

    if(this.state.mode[2]){
      display = 
      <ul className='todo-app__list' id = 'todo-list'>
        {this.state.items.map( (items,index) => {if(this.state.item_complete[index]){ 
          console.log(!this.state.item_complete[index]);
         return(
           <li 
          className='todo-app__item' 
          key = {index}>
          <div className='todo-app__checkbox' >
              <input id ={index} type = 'checkbox'
              onClick={
                () => {var buffer = [...this.state.item_complete];
                  buffer[index]= !buffer[index];
                  this.setState({item_complete:buffer})} 
              }
              checked = {this.state.item_complete[index]?true:false}
              ></input>
              <label htmlFor={index}></label>
          </div>
          
          {this.state.item_complete[index]
              ?<h1 className = 'todo-app__item-detail_complete'>{this.state.items[index]}</h1>
              :<h1 className = 'todo-app__item-detail'>{this.state.items[index]}</h1>}
              
          
          <img 
            src={delete_x} 
            className = 'todo-app__item-x' 
            key = {index}
            alt = 'who cares?'
            onClick = {(e) => {
              var array1 =  [...this.state.items]
              var array2 =  [...this.state.item_complete]
              array1.splice(index,1);
              array2.splice(index,1);
              console.log(index);
              this.setState({items:array1, item_complete:array2});
              }
            }
          ></img>
          </li>
         )
        
          
    }
    }
          )}
      </ul>
      }

      let clean_style;
      if (count_uncomplete(this.state.item_complete)===this.state.item_complete.length)
        clean_style = {visibility : 'hidden'}
      else
        clean_style = {visibility : 'visible'}

      let CleanComplt;

      CleanComplt = <button onClick={() => {

                    var array1 =  [...this.state.items]
                    var array2 =  [...this.state.item_complete]

              for(let i = 0;i<array2.length;i++){
                  if (array2[i]){
                    array1.splice(i,1);
                    array2.splice(i,1);
                    console.log(i);
                    console.log(array1);
                    i-=1;
                  }
              }    
              this.setState({items:array1, item_complete:array2});
              }}
              style = {clean_style}>
              Clear completed</button>
      
      let Foot;
      if(this.state.item_complete.length===0)
      {Foot = null}
      else
      Foot = <footer className='todo-app__footer' id = "todo-footer">
                <div className='todo-app__total'>{count_uncomplete(this.state.item_complete)+' left'}</div>
                <ul className='todo-app__view-buttons'>
                  <button onClick={() => {this.setState({mode:[1,0,0]});}}>All</button>
                  <button onClick={() => {this.setState({mode:[0,1,0]});}}>Active</button>
                  <button onClick={() => {this.setState({mode:[0,0,1]});}}>Completed</button>
                </ul>
                <div className = 'todo-app__clean'>
                  {CleanComplt}
                </div>
              </footer>

    

    return (
      <div className="todo-app__root">
            <header className='todo-app__header'>
               
                <h1 className="todo-app__title">todos</h1>
            </header>
            <section className="todo-app__main" >
                <input 
                    className='todo-app__input' 
                    placeholder = "What needs to be done?" 
                    onKeyPress = { (e) =>{
                      if(e.key ==='Enter'){
                        var newitems = [...this.state.items];
                        newitems.push(e.target.value);
                        var newbool = [...this.state.item_complete];
                        newbool.push(false);
                        // console.log(newitems);
                        // console.log(newbool);
                        this.setState({
                          items : newitems,
                          item_complete : newbool,
                        })
                        e.target.value='';
                      }
                    }
                    }/>
                    {display}
                    
                
             
              </section>

              {Foot}
        </div>
      );
    }
  }


  
  export default TodoHeader;
  


