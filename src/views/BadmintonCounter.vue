<template>
  <b-container fluid class="bg-light vh-100">
    <b-row class="justify-content-center align-items-center text-center h-100">
      <b-col md="5">
        <b-card no-body class="shadow" header-tag="header">
          <template #header>
            <h1 class="font-weight-bold text-muted my-2">
              {{ runningMatchData.team1Player }}
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
                  class="font-weight-bold w-100 d-flex justify-content-center align-items-center py-3"
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
            <b-row>
              <b-col>
                <b-button
                  @click="decrementScore('team1')"
                  variant="danger"
                  size="lg"
                  block
                  class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center py-3"
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
              variant="light"
              block
              class="font-weight-bold w-100 shadow-sm d-flex flex-row justify-content-center align-items-center"
              :to="{ name: 'Match List'}"
            >
              <b-icon-list-check></b-icon-list-check>
              <span class="ps-2">Match Results</span>
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              @click="showSettingModal"
              variant="secondary"
              block
              class="font-weight-bold w-100 shadow-sm mt-3 d-flex flex-row justify-content-center align-items-center"
            >
              <b-icon-gear-fill></b-icon-gear-fill>
              <span class="ps-2">Setup Players</span>
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
              class="font-weight-bold w-100 shadow-sm d-flex flex-row justify-content-center align-items-center"
            >
              <b-icon-play-fill></b-icon-play-fill>
              <span class="ps-2">Start</span>
            </b-button>
          </b-col>
          <b-col class="ps-1">
            <b-button
              @click="stopTimer"
              :disabled="!timerRunning"
              variant="warning"
              block
              class="font-weight-bold w-100 shadow-sm d-flex flex-row justify-content-center align-items-center"
            >
              <b-icon-pause-fill></b-icon-pause-fill>
              <span class="ps-2">Pause</span>
            </b-button>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-button
              @click="resetAll"
              variant="danger"
              block
              class="font-weight-bold w-100 shadow-sm d-flex flex-row justify-content-center align-items-center"
            >
              <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise>
              <span class="ps-2">Reset</span>
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
              @click="updateCurrentMatch"
              variant="info"
              block
              class="font-weight-bold w-100 shadow-sm d-flex flex-row justify-content-center align-items-center"
            >
              <b-icon-flag-fill></b-icon-flag-fill>
              <span class="ps-2">Update Live</span>
            </b-button>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>
            <b-button
              @click="saveData"
              variant="info"
              block
              class="font-weight-bold w-100 shadow-sm d-flex flex-row justify-content-center align-items-center"
            >
              <b-icon-flag-fill></b-icon-flag-fill>
              <span class="ps-2">Finish</span>
            </b-button>
          </b-col>
        </b-row>
      </b-col>

      <b-col md="5">
        <b-card no-body class="shadow" header-tag="header">
          <template #header>
            <h1 class="font-weight-bold text-muted my-2">
              {{ runningMatchData.team2Player }}
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
                  class="font-weight-bold w-100 d-flex justify-content-center align-items-center py-3"
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
            <b-row>
              <b-col>
                <b-button
                  @click="decrementScore('team2')"
                  variant="danger"
                  size="lg"
                  block
                  class="mb-3 font-weight-bold w-100 d-flex justify-content-center align-items-center py-3"
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
            v-model="runningMatchData.team1Player"
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
            v-model="runningMatchData.team2Player"
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
import { db, firebase } from '../firebase';

export default {
  name: "BadmintonCounter",
  components: {},
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
      runningMatchData: {
        team1Score: 0,
        team2Score: 0,
        timeElapsed: 0,
        team1Player: "Player 1 & Player 2",
        team2Player: "Player 3 & Player 4",
      },
      initialMatchData: {
        team1Score: 0,
        team2Score: 0,
        timeElapsed: 0,
        team1Player: "Player 1 & Player 2",
        team2Player: "Player 3 & Player 4",
      },
      localStorageKey: 'matchData',
      isInitialized: false,
      currentMatchId: 'l4b5zRxOghe1B5quXEF2'
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.runningMatchData.timeElapsed / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (this.runningMatchData.timeElapsed % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    },
    team1ScoreTens() {
      return Math.floor(this.runningMatchData.team1Score / 10);
    },
    team1ScoreOnes() {
      return this.runningMatchData.team1Score % 10;
    },
    team2ScoreTens() {
      return Math.floor(this.runningMatchData.team2Score / 10);
    },
    team2ScoreOnes() {
      return this.runningMatchData.team2Score % 10;
    },
  },
  mounted () {
    this.initData()
  },
  methods: {
    incrementScore(team) {
      if (team === "team1") {
        this.runningMatchData.team1Score++;
      } else if (team === "team2") {
        this.runningMatchData.team2Score++;
      }
    },
    decrementScore(team) {
      if (team === "team1" && this.runningMatchData.team1Score > 0) {
        this.runningMatchData.team1Score--;
      } else if (team === "team2" && this.runningMatchData.team2Score > 0) {
        this.runningMatchData.team2Score--;
      }
    },
    startTimer() {
      if (!this.timerRunning) {
        this.timerRunning = true;
        this.timer = setInterval(() => {
          this.runningMatchData.timeElapsed++;
        }, 1000);
        
        this.isInitialized = true
        this.saveToLocalStorage()
      }
    },
    stopTimer() {
      if (this.timerRunning) {
        this.timerRunning = false;
        clearInterval(this.timer);
      }
    },
    resetAll() {
      this.stopTimer();
      this.runningMatchData = {...this.initialMatchData}
      this.isInitialized = false
      localStorage.removeItem(this.localStorageKey)
    },
    showSettingModal() {
      this.modalSettingShow = true;
    },
    hideSettingModal() {
      this.modalSettingShow = false;
    },
    saveToLocalStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.runningMatchData));
    },
    initData() {
      const storedItem = localStorage.getItem(this.localStorageKey);
      
      if (storedItem) {
        try {
          this.runningMatchData  = JSON.parse(storedItem)
          this.startTimer()
        } catch (e) {
          console.error("Error parsing data from local storage:", e);
          this.resetAll();
        }
      } else {
        this.resetAll();
      }
    },
    async saveData() {
      try {
        const docRef = await db.collection('men-doubles-match').add({
          ...this.runningMatchData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      } 
    },
    async updateCurrentMatch() {
      const docRef = db.collection('active-match').doc(this.currentMatchId);
      await docRef.update({
        ...this.runningMatchData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log("Document updated");
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  watch: {
    runningMatchData: {
      deep: true,
      handler: function () {
        if (this.isInitialized) {
          this.saveToLocalStorage()
        }
      }
    }
  }
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
  font-size: 20rem;
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
