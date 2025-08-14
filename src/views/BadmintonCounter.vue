<template>
  <b-container fluid class="bg-light vh-100">
    <b-row class="justify-content-center align-items-center text-center h-100">
      <b-col md="5">
        <b-card no-body class="border-0 shadow-sm">
            <b-card-body >
                <b-row>
                    <b-col>
                        <h2 class="mb-4 font-weight-bold text-muted">Player 1 & Player 2</h2>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button @click="incrementScore('team1')" variant="success" size="lg" block class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center p-4">
                            <b-icon-plus-circle-fill class="mx-2"></b-icon-plus-circle-fill> <span>Add Point</span>
                        </b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <div class="d-flex justify-content-center score-display-container my-3">
                            <div class="score-digit mx-2">{{ team1ScoreTens }}</div>
                            <div class="score-digit mx-2">{{ team1ScoreOnes }}</div>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button @click="decrementScore('team1')" variant="danger" size="lg" block class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center p-4">
                            <b-icon-dash-circle-fill class="mx-2"></b-icon-dash-circle-fill> <span>Subtract Point</span>
                        </b-button>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
      </b-col>

      <b-col md="2" class="d-flex flex-column align-items-center">
        <div class="timer-display mb-3">{{ formattedTime }}</div>
        <b-button-group vertical class="w-75 shadow-sm">
          <b-button @click="startTimer" :disabled="timerRunning" variant="outline-primary" class="font-weight-bold">
            <b-icon-play-fill></b-icon-play-fill> Start
          </b-button>
          <b-button @click="stopTimer" :disabled="!timerRunning" variant="outline-warning" class="font-weight-bold">
            <b-icon-stop-fill></b-icon-stop-fill> Stop
          </b-button>
          <b-button @click="resetAll" variant="outline-danger" class="font-weight-bold">
            <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise> Reset
          </b-button>
        </b-button-group>
      </b-col>

      <b-col md="5">
        <b-card no-body class="border-0 shadow-sm">
            <b-card-body >
                <b-row>
                    <b-col>
                        <h2 class="mb-4 font-weight-bold text-muted">Player 3 & Player 4</h2>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button @click="incrementScore('team2')" variant="success" size="lg" block class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center p-4">
                            <b-icon-plus-circle-fill class="mx-2"></b-icon-plus-circle-fill> <span>Add Point</span>
                        </b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <div class="d-flex justify-content-center score-display-container my-3">
                            <div class="score-digit mx-2">{{ team2ScoreTens }}</div>
                            <div class="score-digit mx-2">{{ team2ScoreOnes }}</div>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button @click="decrementScore('team2')" variant="danger" size="lg" block class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center p-4">
                            <b-icon-dash-circle-fill class="mx-2"></b-icon-dash-circle-fill> <span>Subtract Point</span>
                        </b-button>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
import {
  BIconPlusCircleFill,
  BIconDashCircleFill,
  BIconPlayFill,
  BIconStopFill,
  BIconArrowCounterclockwise
} from 'bootstrap-vue';

export default {
  name: 'BadmintonCounter',
  components: {
    BIconPlusCircleFill,
    BIconDashCircleFill,
    BIconPlayFill,
    BIconStopFill,
    BIconArrowCounterclockwise
  },
  data() {
    return {
      // Scores for each team
      team1Score: 0,
      team2Score: 0,
      // Timer-related data
      timer: null,
      timeElapsed: 0, // in seconds
      timerRunning: false,
    };
  },
  computed: {
    // Computed property to format the timeElapsed into MM:SS format
    formattedTime() {
      const minutes = Math.floor(this.timeElapsed / 60).toString().padStart(2, '0');
      const seconds = (this.timeElapsed % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    },
    // Computed properties to display the score in two separate digits
    team1ScoreTens() {
      return Math.floor(this.team1Score / 10);
    },
    team1ScoreOnes() {
      return this.team1Score % 10;
    },
    team2ScoreTens() {
      return Math.floor(this.team2Score / 10);
    },
    team2ScoreOnes() {
      return this.team2Score % 10;
    },
  },
  methods: {
    // Method to increase the score for a given team
    incrementScore(team) {
      if (team === 'team1') {
        this.team1Score++;
      } else if (team === 'team2') {
        this.team2Score++;
      }
    },
    // Method to decrease the score, ensuring it doesn't go below 0
    decrementScore(team) {
      if (team === 'team1' && this.team1Score > 0) {
        this.team1Score--;
      } else if (team === 'team2' && this.team2Score > 0) {
        this.team2Score--;
      }
    },
    // Method to start the timer
    startTimer() {
      if (!this.timerRunning) {
        this.timerRunning = true;
        this.timer = setInterval(() => {
          this.timeElapsed++;
        }, 1000);
      }
    },
    // Method to stop the timer
    stopTimer() {
      if (this.timerRunning) {
        this.timerRunning = false;
        clearInterval(this.timer);
      }
    },
    // Method to reset scores and the timer
    resetAll() {
      this.stopTimer();
      this.timeElapsed = 0;
      this.team1Score = 0;
      this.team2Score = 0;
    },
  },
  // Clean up the interval when the component is destroyed
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
/* Scoped styles for the component to avoid affecting other parts of the app */
.score-display-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.score-digit {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: .5rem;
  font-size: 15rem;
  font-weight: bold;
  width: 300px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #343a40;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timer-display {
  font-size: 2.5rem;
  font-weight: bold;
  color: #495057;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: .5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-width: 150px;
  text-align: center;
}

.vh-100 {
  min-height: 100vh;
}

.font-weight-bold {
    font-weight: 700 !important;
}
</style>
