<template>
  <div class="m-5">
    <b-row>
      <b-col class="d-flex justify-content-start">
        <b-button
          variant="primary"
          class="px-4 d-flex flex-row justify-content-center align-items-center"
          :to="{ name: 'Live Counter' }"
        >
          <b-icon-play-btn-fill></b-icon-play-btn-fill> <span class="ps-2">Live</span>
        </b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <b-card header-tag="header" class="shadow-sm">
          <template #header>
            <h1 class="font-weight-bold text-muted my-2">
              Men's Doubles Winner 🏆
            </h1>
          </template>
          <b-table
            striped
            hover
            responsive
            :items="menWinner"
            :fields="fieldsWinner"
            class="rounded-lg overflow-hidden bg-white"
          >
          </b-table>
        </b-card>

        <b-card header-tag="header" class="mt-5 mb-5">
          <template #header>
            <h5 class="font-weight-bold text-muted my-2">
              Men's Doubles All Matches
            </h5>
          </template>
          <b-table
            id="men"
            striped
            hover
            responsive
            :items="menMatches"
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

      <b-col>
        <b-card header-tag="header" class="shadow-sm">
          <template #header>
            <h1 class="font-weight-bold text-muted my-2">
              Mixed Doubles Winner 🏆
            </h1>
          </template>
          <b-table
            striped
            hover
            responsive
            :items="mixedWinner"
            :fields="fieldsWinner"
            class="rounded-lg overflow-hidden bg-white"
          >
          </b-table>
        </b-card>

        <b-card header-tag="header" class="mt-5">
          <template #header>
            <h5 class="font-weight-bold text-muted my-2">
              Mixed Doubles All Matches
            </h5>
          </template>

          <b-table
            id="mixed"
            striped
            hover
            responsive
            :items="mixedMatches"
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
  </div>
</template>

<script>
import { db } from '../firebase';

export default {
  name: "MatchList",
  components: {
  },
  data() {
    return {
      fieldsWinner: [
        { key: "no", label: "#", sortable: false, class: "text-center" },
        { key: "team", label: "Team", sortable: false },
      ],
      menWinner: [
        { no: "1st", team: "TBD" },
        { no: "2nd", team: "TBD" },
        { no: "3rd", team: "TBD" },
      ],
      mixedWinner: [
        { no: "1st", team: "TBD" },
        { no: "2nd", team: "TBD" },
        { no: "3rd", team: "TBD" },
      ],
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
      menMatches: [
        {
          no: 1,
          team1Player: 'Men 1 & Men 2',
          team2Player: 'Men 3 & Men 4',
          score: {
            team1Score: 0,
            team2Score: 0,
          },
          timeElapsed: 100,
        },
      ],
      mixedMatches: [
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
  methods: {
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
    async fetchCollections() {
      try {
        const collectionRef1 = db.collection('men-doubles-match');
        const collectionRef2 = db.collection('mixed-doubles-match');
        const collectionRef3 = db.collection('match-winner');
        
        const [snapshot1, snapshot2, snapshot3] = await Promise.all([
          collectionRef1.get(),
          collectionRef2.get(),
          collectionRef3.get()
        ]);

        const menDoubes = snapshot1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const mixedDoubles = snapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const winner = snapshot3.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const transformedMenDoubes = menDoubes.map(match => {
          const { team1Score, team2Score, ...rest } = match
          
          return {
            score: {
              team1Score,
              team2Score
            },
            ...rest
          };
        });
        const transformedMixedDoubles = mixedDoubles.map(match => {
          const { team1Score, team2Score, ...rest } = match
          
          return {
            score: {
              team1Score,
              team2Score
            },
            ...rest
          };
        });

        this.menMatches = transformedMenDoubes
        this.mixedMatches = transformedMixedDoubles

        this.menWinner = winner[0]['winners']
        this.mixedWinner = winner[1]['winners']
        this.loading = false;
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    }
  },
  async mounted () {
    await this.fetchCollections()
  },
};
</script>

<style scoped>
.shadow-sm {
  box-shadow: 0 1rem 3rem rgba(255, 193, 7, 0.2) !important; /* Adjusted opacity for a more subtle glow */
}
</style>
