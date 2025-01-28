<template>
  <div class="index-container">
    <h1 class="title">Dobrodošli u Foodify!</h1>
    <div class="images">
      <div class="image">
        <img
          src="https://www.friedas.com/wp-content/uploads/2012/02/online-LycheeRenederingPNG.png"
          alt="lychee"
          class="img"
        />
        <p class="description">
          Poznato i kao "liči orasi", ovo malo, nepogrešivo slatko voće ima grubu, neravnu koru koja
          varira od crvene do blijedozelene boje. Unutrašnjost ličija ima mirisno, sočno meso poput
          grožđa koje okružuje jednu veliku, nejestivu sjemenku. Dostupno i u organskom izdanju.
        </p>
      </div>
      <div class="image">
        <img
          src="/mango.png"
          alt="suseni mango"
          class="img"
        />
        <p class="description">
          Tropski kralj voća osvojit će vas obiljem aroma! Nutrigold sušeni mango dobiven je
          procesom sušenja zrelih i sočnih plodova manga iz certificiranog organskog uzgoja te ga
          karakterizira iznimna kvaliteta i bogatstvo hranjivih tvari. Sušenjem je uklonjena je samo
          voda iz manga zbog čega su prisutni mnogobrojni nutrijenti koncentriraniji u konačnom
          proizvodu. Ovo egzotično voće obiluje ugljikohidratima što ga čini izvrsnim izvorom
          energije, a samim time i vrhunskom grickalicom u kojoj možete uživati u predahu od posla,
          na izletu ili doma, uz omiljeni film. Osim što je Nutrigold mango idealna grickalica, može
          se poslužiti kao idealan dodatak brojnim receptima slastica – ukusnom biskvitu koji će
          biti neodoljivo sočan i ispunjen bogatstvom okusa ili jutarnjoj kaši uz orašaste plodove i
          jogurt. Nutrigold mango izvrsno će se uklopiti u gotovo svaku vašu kulinarsku zamisao!
        </p>
      </div>
      <div class="image">
        <img
          src="/marakuja.png"
          alt="sladoled marakuja"
          class="img"
        />
        <p class="description">
          Aroma u pasti od slatke marakuje. Za sladoled intenzivne narančaste boje i jedinstvenog
          okusa. Sadrži 30 % voća sa sjemenkama.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
.index-container {
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.title {
  font-size: 32px;
  color: indigo;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 500;
}

.images {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.image {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .image:last-child {
    grid-column: span 2;
  }
}

.img {
  width: 100%;
  height: 460px;
  object-fit: contain;
  object-position: center;
}

.description {
  font-size: 14px;
  color: indigo;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 700;
  margin-top: 10px;
}
</style>
