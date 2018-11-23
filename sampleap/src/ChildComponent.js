import React from 'react'
import GrandChild from './GrandChild';
export default class ChildComponent extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            Open:true,           
            csample:'',
           // movies :this.props.movies,
            movies :this.props.movies,
            ID:this.props.ID,
            SystemName:this.props.SystemName,
            BatchNames:[]
        }
       this.onclick = this.onclick.bind(this);
   }
   componentWillMount()
   {
       console.log('Child Component : componentWillMount');    
   }
   componentDidMount() {
    console.log('Child Component : componentDidMount');
   }
    onclick()
    { 
        let SystemName=this.props.SystemName;
        fetch('http://localhost:54025/GetBatchDetails?SystemName='+SystemName)
        .then((response) => response.json())
        .then((responseJson) => {
            debugger;
            this.setState({BatchNames: responseJson.BatchesDetails});           
        }).then
        (()=>{
                 this.setState({Open:this.state.Open});
                 console.log('Parent Component clicked.');
                console.log('Child Component clicked.');
                console.log('clicked.'+this.state.Open)  ;   
                console.log('ID '+this.state.ID);
                this.state.BatchNames.map(b=>
                    console.log('BatchNames '+b.BatchName)
            );
              
            }
      )
    }
    render()
    {
        return(
            <div>
            {/* <p onClick={this.onclick} style={this.state.Open?Styles.Open:Styles.Close}>
            Child Component</p> */}
             {/* <ul>
               {this.state.movies.map(movie=><li key={movie.id}>{movie.title}</li> )}
            </ul> */}
             <p onClick={this.onclick.bind(this)}>{this.props.SystemName}</p> 
             {this.state.BatchNames.map(Batch=>
                    
               <GrandChild  BatchName={Batch.BatchName}>              
              </GrandChild>
             )
             }
            </div>
        );  
                 
    }
    componentDidUpdate(prevProps,prevState,snapshot)
    {       
        console.log('Child Component : componentDidUpdate')
    }
    componentWillUnmount()
    {
        console.log('Child Component : componentWillUnmount')
    }
    
}
const Styles={
    Open:{ 
        color:'Green',
        fontSize:30,
       // display:'block'
 },
    Close:{
        color:'Red',
        fontSize:30,
       // display:'none'

}
            
}