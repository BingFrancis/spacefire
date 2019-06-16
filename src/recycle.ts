class recycle{
    public recycle_array:enemy[] = [];
    public enemy_out : enemy;
    
    public recycle_in(enemy:enemy){
        enemy.recycle = true ;
        this.recycle_array.push(enemy);
        
    }

    public recycle_out(){
        for(var i=0; i<this.recycle_array.length; i++){
          if(this.recycle_array[i].recycle==true){  
              this.enemy_out= this.recycle_array[i];  
              this.recycle_array.splice(i,1);
              break;
            }
        }
    }
}