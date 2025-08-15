<template>
  <!-- Main container, ensuring the app takes up the full viewport height -->
  <b-container fluid class="bg-light vh-100 p-3 p-md-5 pt-5 live-page">

    <!-- New row for event and match names -->
    <b-row class="justify-content-center text-center mb-4">
      <b-col cols="12">
        <h2 class="font-weight-bold text-secondary mb-1">{{ eventName }}</h2>
        <h4 class="font-weight-normal text-muted mt-3">{{ matchName }}</h4>
      </b-col>
    </b-row>

    <!-- Row for the two score cards, side-by-side on all screens -->
    <b-row class="justify-content-center text-center flex-grow-1 mb-4">
      <!-- Team 1 Score Card -->
      <b-col cols="6" class="d-flex justify-content-center align-items-center p-1 p-md-2">
        <b-card no-body class="shadow-sm w-100 rounded-lg" header-tag="header">
          <template #header>
            <h1 class="font-weight-bold text-muted my-2 h6 h5-md">{{ runningMatchData.team1Player }}</h1>
          </template>
          <b-card-body class="d-flex flex-column justify-content-center">
            <div class="score-display-container my-2 my-md-3">
              <div class="score-digit mx-1">{{ team1ScoreTens }}</div>
              <div class="score-digit mx-1">{{ team1ScoreOnes }}</div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>

      <!-- Team 2 Score Card -->
      <b-col cols="6" class="d-flex justify-content-center align-items-center p-1 p-md-2">
        <b-card no-body class="shadow-sm w-100 rounded-lg" header-tag="header">
          <template #header>
            <h1 class="font-weight-bold text-muted my-2 h6 h5-md">{{ runningMatchData.team2Player }}</h1>
          </template>
          <b-card-body class="d-flex flex-column justify-content-center">
            <div class="score-display-container my-2 my-md-3">
              <div class="score-digit mx-1">{{ team2ScoreTens }}</div>
              <div class="score-digit mx-1">{{ team2ScoreOnes }}</div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- Row for the timer and match results button, positioned below the score cards -->
    <b-row class="justify-content-center text-center mb-4">
      <b-col cols="12" md="6" lg="4" class="d-flex flex-column align-items-center">
        <div class="timer-display my-2 shadow-sm rounded-lg">{{ formattedTime }}</div>
        <b-button
          variant="success"
          class="font-weight-bold my-2 shadow-sm d-flex flex-row justify-content-center align-items-center rounded-lg"
          :to="{ name: 'Match List' }"
        >
          <b-icon-list-check></b-icon-list-check>
          <span class="ps-2">All Match Results</span>
        </b-button>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col>
        <hr>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col>
        <b-card header-tag="header">
          <template #header>
            <h5 class="font-weight-bold text-muted my-2">
              Recent Matches ⚡
            </h5>
          </template>

          <b-table
            striped
            hover
            responsive
            :items="recentMatches"
            :fields="fields"
            class="rounded-lg overflow-hidden bg-white"
          >
            <template #cell(score)="data">
              <div>
                {{ data.item.score.team1Score }} -
                {{ data.item.score.team2Score }}
              </div>
            </template>
            <template #cell(timeElapsed)="data">
              <div>
                {{ secondsToFormattedTime(data.item.timeElapsed) }}
              </div>
            </template>
          </b-table>
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
      eventName: 'Yakin Hidup Sehat Cup 2025 🏸🏆',
      matchName: '',
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
      currentMatchId: 'l4b5zRxOghe1B5quXEF2',
      fields: [
        { key: "team1Player", label: "Team 1", sortable: false },
        { key: "team2Player", label: "Team 2", sortable: false },
        {
          key: "score",
          label: "Score",
          sortable: false,
          class: "text-center",
        },
        {
          key: "timeElapsed",
          label: "Duration",
          sortable: false,
          class: "text-center",
        }
      ],
      recentMatches: [
        {
          no: 1,
          team1Player: 'Player 1 & Player 2',
          team2Player: 'Player 3 & Player 4',
          score: {
            team1Score: 0,
            team2Score: 0,
          },
          timeElapsed: 100,
        },
      ],
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
          this.matchName = this.runningMatchData.matchName
          this.startTimer()
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
      }
    },
    stopTimer() {
      if (this.timerRunning) {
        this.timerRunning = false;
        clearInterval(this.timer);
      }
    },
    secondsToFormattedTime(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;

      const minutes = Math.floor(totalSeconds / 60);

      const seconds = totalSeconds % 60;

      const parts = [];
      if (hours > 0) {
        parts.push(`${hours}hr`);
      }
      if (minutes > 0) {
        parts.push(`${minutes}m`);
      }
      if (seconds > 0 || parts.length === 0) {
        parts.push(`${seconds}s`);
      }

      return parts.join(' ');
    },
    toMillis(ts) {
      if (!ts) return 0;
      return ts.seconds * 1000 + Math.floor(ts.nanoseconds / 1e6);
    },

    sortByCreatedAtDesc(data) {
      return data.sort((a, b) => this.toMillis(b.createdAt) - this.toMillis(a.createdAt));
    },
    async fetchCollections() {
      try {
        const collectionRef1 = db.collection('men-doubles-match');
        const collectionRef2 = db.collection('mixed-doubles-match');
        
        const [snapshot1, snapshot2] = await Promise.all([
          collectionRef1.get(),
          collectionRef2.get()
        ]);

        const items = snapshot1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const otherItems = snapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const combined = [...items, ...otherItems]

        const transformedMatches = combined.map(match => {
          const { team1Score, team2Score, ...rest } = match
          
          return {
            score: {
              team1Score,
              team2Score
            },
            ...rest
          };
        });

        this.recentMatches = this.sortByCreatedAtDesc(transformedMatches)
        this.loading = false;
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    }
  },
  async mounted () {
    await this.fetchCollections()
    this.startListening()
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
};
</script>

<style scoped>
/* Scoped styles to apply only to this component */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

body, .h1, .h2, .h3, .h4, .h5, .h6, .live-page {
  font-family: 'Lato', sans-serif !important;
}

/* Scoped styles to apply only to this component */
.vh-100 {
  min-height: 100vh;
}

.score-display-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.score-digit {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4a5568;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);

  /* Responsive sizing for mobile first */
  font-size: 15vw; /* Scales font size with viewport width */
  width: 20vw;
  height: 30vw;
  transition: all 0.3s ease;

  /* Media query for larger screens to cap the size */
  @media (min-width: 992px) {
    font-size: 10rem;
    width: 130px;
    height: 195px;
  }
}

.timer-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a5568;
  background-color: #fff;
  padding: 10px 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-width: 150px;
  text-align: center;
  
  /* Media query for larger screens */
  @media (min-width: 992px) {
    font-size: 2rem;
  }
}

/* Responsive font sizing for headers */
.h6 { font-size: 1rem; }
.h5-md { font-size: 1.25rem; }
@media (min-width: 768px) {
  .h5-md { font-size: 1.5rem; }
}

.font-weight-light {
    font-weight: 300 !important;
}
.font-weight-normal {
    font-weight: 400 !important;
}
.rounded-lg {
    border-radius: 0.75rem !important;
}
</style>