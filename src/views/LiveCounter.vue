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
                <div
                  class="d-flex justify-content-center score-display-container my-3"
                >
                  <div class="score-digit mx-2">{{ team1ScoreTens }}</div>
                  <div class="score-digit mx-2">{{ team1ScoreOnes }}</div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>

      <b-col md="2">
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
          <b-col>
            <b-button
              variant="primary"
              block
              class="font-weight-bold w-100 shadow-sm d-flex flex-row justify-content-center align-items-center"
              @click="startListening"
            >
              <b-icon-list-check></b-icon-list-check>
              <span class="ps-2">Match Results</span>
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
                <div
                  class="d-flex justify-content-center score-display-container my-3"
                >
                  <div class="score-digit mx-2">{{ team2ScoreTens }}</div>
                  <div class="score-digit mx-2">{{ team2ScoreOnes }}</div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from '../firebase';

export default {
  name: 'LiveCounter',
  data() {
    return {
      docId: 'l4b5zRxOghe1B5quXEF2',
      docData: null,
      loading: false,
      unsubscribe: null,
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
  methods: {
    startListening() {
      this.stopTimer()
      if (this.unsubscribe) {
        this.unsubscribe();
      }

      if (!this.docId) {
        this.runningMatchData = {};
        return;
      }
      
      this.loading = true;
      this.runningMatchData = {};

      const docRef = db.collection('active-match').doc(this.docId);

      this.unsubscribe = docRef.onSnapshot(docSnapshot => {
        if (docSnapshot.exists) {
          this.runningMatchData = { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
          this.runningMatchData = {};
        }
        this.loading = false;
      }, error => {
        console.error("Error fetching document: ", error);
        this.loading = false;
      });
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
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
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
