new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameOn: false,
        turns: [],
    },
    methods: {
        startGame: function() { 
            this.gameOn = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(10,3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage,
            });
            if(this.checkWin()) {
                return;
            }
            this.monsterAttack(); 
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage,
            });
            if(this.checkWin()) {
                return;
            }
            this.monsterAttack(); 
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for ' + '10'
            });
            this.monsterAttack(); 
        },
        giveUp: function() {
            this.gameOn = false;
        },
        monsterAttack: function() {
            var damage = this.calculateDamage(12,5);
            this.playerHealth -=  damage;
            this.checkWin(); 

            this.turns.unshift({
                isPlayer: false, 
                text: 'Monster hits player for ' + damage,
            });
        },
        calculateDamage: function(max, min) {
            // This is how to display a random number between a max and min number
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if(this.monsterHealth <= 0) {
               if(confirm('You Won! New game?')) {
                   this.startGame();
               } else {
                   this.gameOn = false;
               }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You Lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameOn = false;
                }
                return true;
            }
            return false;
        }
    },
    
});