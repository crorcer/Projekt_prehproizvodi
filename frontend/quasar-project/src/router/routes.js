const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'pregled', component: () => import('pages/PregledPrehProizvodaPage.vue') },
      { path: 'unos', component: () => import('pages/UnosPrehProizvodaPage.vue') },
      { path: 'prodaja', component: () => import('pages/ProdajaPrehProizvodaPage.vue') }
    ]
  },
]

export default routes
