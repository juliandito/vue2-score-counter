<template>
  <b-container fluid class="bg-light vh-100">
    <b-row class="justify-content-center align-items-center text-center h-100">
      <b-col md="5">
        <b-card no-body class="shadow" header-tag="header">
          <template #header>
            <h1 class="font-weight-bold text-muted my-2">
              {{ team1Player }}
            </h1>
          </template>

          <b-card-body>
            <b-row>
              <b-col>
                <b-button
                  @click="incrementScore('team1')"
                  variant="success"
                  size="lg"
                  block
                  class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center p-4"
                >
                  <b-icon-plus-circle-fill
                    class="mx-2"
                  ></b-icon-plus-circle-fill>
                  <span>Add Point</span>
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div
                  class="d-flex justify-content-center score-display-container my-3"
                >
                  <div class="score-digit mx-2">{{ team1ScoreTens }}</div>
                  <div class="score-digit mx-2">{{ team1ScoreOnes }}</div>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b-button
                  @click="decrementScore('team1')"
                  variant="danger"
                  size="lg"
                  block
                  class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center p-4"
                >
                  <b-icon-dash-circle-fill
                    class="mx-2"
                  ></b-icon-dash-circle-fill>
                  <span>Subtract Point</span>
                </b-button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col md="2">
        <b-row>
          <b-col>
            <b-button
              @click="showSettingModal"
              variant="secondary"
              block
              class="font-weight-bold w-100 shadow-sm"
            >
              <b-icon-gear-fill></b-icon-gear-fill> Setup Players
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="timer-display">{{ formattedTime }}</div>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <hr />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="pe-1">
            <b-button
              @click="startTimer"
              :disabled="timerRunning"
              variant="primary"
              block
              class="font-weight-bold w-100 shadow-sm"
            >
              <b-icon-play-fill></b-icon-play-fill> Start
            </b-button>
          </b-col>
          <b-col class="ps-1">
            <b-button
              @click="stopTimer"
              :disabled="!timerRunning"
              variant="warning"
              block
              class="font-weight-bold w-100 shadow-sm"
            >
              <b-icon-stop-fill></b-icon-stop-fill> Stop
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-button
              @click="resetAll"
              variant="danger"
              block
              class="font-weight-bold w-100 shadow-sm"
            >
              <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise>
              Reset
            </b-button>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col>
            <hr />
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>
            <b-button
              variant="info"
              block
              class="font-weight-bold w-100 shadow-sm"
            >
              <b-icon-flag-fill></b-icon-flag-fill> Finish
            </b-button>
          </b-col>
        </b-row>
      </b-col>

      <b-col md="5">
        <b-card no-body class="shadow" header-tag="header">
          <template #header>
            <h1 class="font-weight-bold text-muted my-2">
              {{ team2Player }}
            </h1>
          </template>
          <b-card-body>
            <b-row>
              <b-col>
                <b-button
                  @click="incrementScore('team2')"
                  variant="success"
                  size="lg"
                  block
                  class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center p-4"
                >
                  <b-icon-plus-circle-fill
                    class="mx-2"
                  ></b-icon-plus-circle-fill>
                  <span>Add Point</span>
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div
                  class="d-flex justify-content-center score-display-container my-3"
                >
                  <div class="score-digit mx-2">{{ team2ScoreTens }}</div>
                  <div class="score-digit mx-2">{{ team2ScoreOnes }}</div>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b-button
                  @click="decrementScore('team2')"
                  variant="danger"
                  size="lg"
                  block
                  class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center p-4"
                >
                  <b-icon-dash-circle-fill
                    class="mx-2"
                  ></b-icon-dash-circle-fill>
                  <span>Subtract Point</span>
                </b-button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-modal
      id="settingModal"
      title="Match Players"
      v-model="modalSettingShow"
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
    >
      <b-row>
        <b-col sm="2" class="d-flex align-items-center">
          <label for="input-small">Team 1:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-team-1"
            placeholder="Player Name"
            v-model="team1Player"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col sm="2" class="d-flex align-items-center">
          <label for="input-small">Team 2:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-team-2"
            placeholder="Player Name"
            v-model="team2Player"
          ></b-form-input>
        </b-col>
      </b-row>

      <template #modal-footer>
        <b-button variant="secondary" @click="hideSettingModal">Close</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import {
  BIconPlusCircleFill,
  BIconDashCircleFill,
  BIconPlayFill,
  BIconStopFill,
  BIconArrowCounterclockwise,
  BIconGearFill,
  BIconFlagFill,
} from "bootstrap-vue";

export default {
  name: "BadmintonCounter",
  components: {
    BIconPlusCircleFill,
    BIconDashCircleFill,
    BIconPlayFill,
    BIconStopFill,
    BIconArrowCounterclockwise,
    BIconGearFill,
    BIconFlagFill,
  },
  data() {
    return {
      team1Score: 0,
      team2Score: 0,
      timer: null,
      timeElapsed: 0,
      timerRunning: false,
      modalSettingShow: false,
      team1Player: "Player 1 & Player 2",
      team2Player: "Player 3 & Player 4",
    };
  },
  computed: {
    // Computed property to format the timeElapsed into MM:SS format
    formattedTime() {
      const minutes = Math.floor(this.timeElapsed / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (this.timeElapsed % 60).toString().padStart(2, "0");
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
      if (team === "team1") {
        this.team1Score++;
      } else if (team === "team2") {
        this.team2Score++;
      }
    },
    // Method to decrease the score, ensuring it doesn't go below 0
    decrementScore(team) {
      if (team === "team1" && this.team1Score > 0) {
        this.team1Score--;
      } else if (team === "team2" && this.team2Score > 0) {
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
    showSettingModal() {
      this.modalSettingShow = true;
    },
    hideSettingModal() {
      this.modalSettingShow = false;
    },
  },
  // Clean up the interval when the component is destroyed
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.score-display-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.score-digit {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
