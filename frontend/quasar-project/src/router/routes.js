const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () =>
          import('pages/IndexPage.vue') },
      { path: 'pregled_diskografije', component: () =>
          import('pages/PregledDiskografijePage.vue') },
      { path: 'unos_diskografije', component: () =>
          import('pages/UnosDiskografijePage.vue') },
      { path: 'prodaja_diskografije', component: () =>
          import('pages/ProdajaDiskografijePage.vue') }
    ]
  },
]
export default routes
