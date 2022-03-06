import My_Audio from "./Audio_";
import {calculate_total_time, calculate_speed_vy_hmax, calculate_h_max, calculate_speed_vx_with_tt, calculate_speed_vy, calculate_speed_vx, calculate_h, change_hand_done, g} from "./utils";

// const _audio = new My_Audio()


export default class Ball{
    constructor(ctx, x, y, color, size, _initial_hand, _initial_time, _list_of_throw) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.color = color;
        this.size = size;
        this.initial_time = _initial_time
        this.list_of_throw = _list_of_throw
        this.index_list = 0
        this.audio = new My_Audio()

        this.current_hand = _initial_hand // 0 left hand, 1 right hand

        this.x0 = x
        this.y0 = y

        this.h = this.y
        this.h_max = null

        this.vy0 = 0
        this.vy = null
        this.vx = null
        this.t = 0

        this.total_time = null
        this.current_bounce = 0
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

        this.ctx.fill();
      }

    update(width, height) {
        //change orientation if necessary
        this.x + this.size >= width && (this.speedX = -this.speedX) /*&& this.audio.playAudio()*/;
        this.x - this.size <= 0 && (this.speedX = -this.speedX) /*&& this.audio.playAudio()*/;
        
        this.y + this.size >= height && (this.speedY = -this.speedY) && this.audio.playAudio();
        this.y - this.size <= 0 && (this.speedY = -this.speedY) /*&& this.audio.playAudio()*/;
        
        //update position
        this.x += this.speedX;
        this.y += this.speedY;
      }
      
    apply_throw(width, height){
      if (this.list_of_throw.length <= this.index_list /*|| (this.vy != null && this.vy < 1)*/)
        return

      console.log("APPLY THROW", this.list_of_throw[this.index_list].bounce_amount, this.index_list, this.list_of_throw.length)
      if (this.list_of_throw[this.index_list].bounce_amount <= 0 && change_hand_done(this.x, this.y, this.current_hand, this.list_of_throw[this.index_list].change_hand, this.t)){
        this.index_list += 1

        if (this.index_list >= this.list_of_throw.length){
          console.log("RETURNNNNNNNNNNN")
          return 
        }

        this.current_hand = (this.current_hand + 1)%2

        this.x0 = this.x
        this.y0 = this.y

        this.h = this.y
        this.h_max = null

        this.vy0 = 0
        this.vy = null
        this.vx = null
        this.t = 0

        this.total_time = null
        this.current_bounce = 0
        // console.log("AAAAAAAAAAAAaa")
        // reset params
        // return
      }
      
      this.vy == null && (this.vy = this.list_of_throw[this.index_list].initial_velocity)
      
      //Calculo la velocidad de la pelota despues del rebote y se restablece el tiempo
      this.y + this.size >= height && this.t > 1 && (this.list_of_throw[this.index_list].bounce_amount = this.list_of_throw[this.index_list].bounce_amount - 1) 
      && (this.vy = calculate_speed_vy(this.vy0, this.current_bounce)) && (this.current_bounce += 1) &&  (this.x0 = this.x) && (this.y0 = this.y) && this.audio.playAudio() && (this.vy0 = this.vy) && (this.t = 0) 
      
      this.h_max == null && this.vy > 0 && (this.h_max = calculate_h_max(this.vy))
      
      //Calculo la velocidad con que cae la pelota
      this.h_max != null && this.h_max > 0 && this.y - this.size <= Math.abs(this.h - this.h_max) && (this.vy0 = -calculate_speed_vy_hmax(this.vy, Math.abs(window.innerHeight - (this.h - this.h_max)))) && (this.h_max = 0)
      
      this.vy0 == 0 && this.vy < 0 && (this.vy0 = this.vy) && (this.h_max = 0)
      
      this.list_of_throw[this.index_list].bounce_amount > 0 && this.total_time == null && 
        (this.total_time = calculate_total_time(this.vy, this.h, this.list_of_throw[this.index_list].bounce_amount, this.list_of_throw[this.index_list].catch_ball))
      

      this.total_time != null && this.vx == null && (this.vx = calculate_speed_vx_with_tt(this.total_time, this.list_of_throw[this.index_list].change_hand, this.current_hand, this.x))

      this.vx == null && (this.vx = calculate_speed_vx(this.list_of_throw[this.index_list].change_hand, this.current_hand, this.x, this.vy))
      


      // console.log("VY0", this.vy0, this.h_max)

      this.x = this.x0 - this.vx * this.t 
      this.y = this.y0 - (this.vy * this.t - 1/2 * g * (this.t * this.t))
      
      this.t += 0.1
    }

    
    collisionDetect(balls) {
        for (let j = 0; j < balls.length; j++) {
            if (this !== balls[j]) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.size + balls[j].size) {
                    const red = this.random(0, 255);
                    const green = this.random(0, 255);
                    const blue = this.random(0, 255);
                  
              balls[j].color = this.color =
                "rgb(" + red + "," + green + "," + blue + ")";
            }
          }
        }
      }

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}