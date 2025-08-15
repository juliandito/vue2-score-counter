<template>
  <div class="m-5">
    <b-row>
      <b-col class="d-flex justify-content-start">
        <b-button variant="primary" class="px-4 d-flex flex-row justify-content-center align-items-center">
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
            :items="matchesWinner"
            :fields="fieldsWinner"
            class="rounded-lg overflow-hidden bg-white"
          >
          </b-table>
        </b-card>

        <b-card header-tag="header" class="mt-5">
          <template #header>
            <h5 class="font-weight-bold text-muted my-2">
              Men's Doubles All Matches
            </h5>
          </template>
          <b-table
            striped
            hover
            responsive
            :items="matches"
            :fields="fields"
            class="rounded-lg overflow-hidden bg-white"
          >
            <template #cell(team1)="data">
              <div>
                <div class="font-semibold">{{ data.item.team1.player1 }}</div>
                <div class="text-sm text-gray-500">
                  {{ data.item.team1.player2 }}
                </div>
              </div>
            </template>

            <template #cell(team2)="data">
              <div>
                <div class="font-semibold">{{ data.item.team2.player1 }}</div>
                <div class="text-sm text-gray-500">
                  {{ data.item.team2.player2 }}
                </div>
              </div>
            </template>

            <template #cell(score)="data">
              <div
                :class="{
                  'font-bold text-green-600': data.item.winner === 'Team 1',
                }"
              >
                {{ data.item.score.team1_sets }} -
                {{ data.item.score.team2_sets }}
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
            :items="matchesWinner"
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
            striped
            hover
            responsive
            :items="matches"
            :fields="fields"
            class="rounded-lg overflow-hidden bg-white"
          >
            <template #cell(team1)="data">
              <div>
                <div class="font-semibold">{{ data.item.team1.player1 }}</div>
                <div class="text-sm text-gray-500">
                  {{ data.item.team1.player2 }}
                </div>
              </div>
            </template>

            <template #cell(team2)="data">
              <div>
                <div class="font-semibold">{{ data.item.team2.player1 }}</div>
                <div class="text-sm text-gray-500">
                  {{ data.item.team2.player2 }}
                </div>
              </div>
            </template>

            <template #cell(score)="data">
              <div
                :class="{
                  'font-bold text-green-600': data.item.winner === 'Team 1',
                }"
              >
                {{ data.item.score.team1_sets }} -
                {{ data.item.score.team2_sets }}
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
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
      matchesWinner: [
        { no: "1st", team: "TBD" },
        { no: "2nd", team: "TBD" },
        { no: "3rd", team: "TBD" },
      ],
      fields: [
        { key: "no", label: "#", sortable: false, class: "text-center" },
        { key: "team1", label: "Team 1", sortable: false },
        { key: "team2", label: "Team 2", sortable: false },
        {
          key: "score",
          label: "Score",
          sortable: false,
          class: "text-center",
        },
        {
          key: "duration",
          label: "Duration",
          sortable: false,
          class: "text-center",
        },
      ],
      matches: [
        {
          no: 1,
          team1: { player1: "Marcus Gideon", player2: "Kevin Sukamuljo" },
          team2: { player1: "Lee Yong Dae", player2: "Yoo Yeon Seong" },
          score: {
            team1_sets: 2,
            team2_sets: 1,
            set_scores: ["21-17", "18-21", "21-19"],
          },
          duration: "1h 25m",
          winner: "Team 1",
        },
        {
          no: 2,
          team1: { player1: "Hendra Setiawan", player2: "Mohammad Ahsan" },
          team2: { player1: "Takuro Hoki", player2: "Yugo Kobayashi" },
          score: {
            team1_sets: 1,
            team2_sets: 2,
            set_scores: ["15-21", "21-19", "17-21"],
          },
          duration: "1h 10m",
          winner: "Team 2",
        },
        {
          no: 3,
          team1: { player1: "Wang Chi-Lin", player2: "Lee Yang" },
          team2: { player1: "Li Junhui", player2: "Liu Yuchen" },
          score: {
            team1_sets: 2,
            team2_sets: 0,
            set_scores: ["21-18", "21-12"],
          },
          duration: "55m",
          winner: "Team 1",
        },
      ],
    };
  },
};
</script>

<style scoped>
.shadow-sm {
  box-shadow: 0 1rem 3rem rgba(255, 193, 7, 0.2) !important; /* Adjusted opacity for a more subtle glow */
}
</style>
