import BreadcrumbsPlugin, { BreadcrumbsPluginPage } from '../BreadcrumbsPlugin';

const pages: BreadcrumbsPluginPage[] = [
  {
    fullPath: '/FolderA/index.mdx',
    route: 'route/folderA/index',
    title: 'Folder A Index',
    layout: 'DetailOverview'
  },
  {
    fullPath: '/FolderA/pageA.mdx',
    route: 'route/folderA/pageA',
    title: 'Folder A Page A',
    layout: 'DetailOverview'
  },
  {
    fullPath: '/FolderA/pageB.mdx',
    route: 'route/folderA/pageB',
    title: 'Folder A Page B',
    layout: 'DetailOverview'
  },
  {
    fullPath: '/FolderA/SubfolderA/index.mdx',
    route: 'route/folderA/subfolderA/index',
    title: 'Subfolder A Index',
    layout: 'DetailOverview'
  },
  {
    fullPath: '/FolderA/SubfolderA/PageA.mdx',
    route: 'route/folderA/subfolderA/pageA',
    title: 'Subfolder A Page A',
    layout: 'DetailOverview'
  },
  {
    fullPath: '/FolderA/SubfolderA/PageB.mdx',
    route: 'route/folderA/subfolderA/pageB',
    title: 'Subfolder A Page B',
    layout: 'DetailOverview'
  },
  {
    fullPath: '/FolderA/SubfolderA/PageB.mdx',
    route: 'route/folderA/subfolderA/pageB',
    title: 'Subfolder A Page B',
    layout: 'DetailOverview',
    breadcrumbs: [
      {
        label: 'Label A',
        path: 'path/A',
        id: 'id A'
      },
      {
        label: 'Label B',
        path: 'path/B',
        id: 'id B'
      }
    ]
  }
];

describe('GIVEN the BreadcrumbsPlugin', () => {
  let updatedPages: BreadcrumbsPluginPage[] = [];
  beforeEach(async () => {
    const $afterSource = BreadcrumbsPlugin.$afterSource;
    // @ts-ignore
    updatedPages = (await $afterSource?.(pages, {}, { indexPageName: 'index.mdx' })) || [];
  });
  test('THEN it should use the `$afterSource` lifecycle event', () => {
    expect(BreadcrumbsPlugin).toHaveProperty('$afterSource');
  });

  describe('AND WHEN `$afterSource` is called', () => {
    test('THEN breadcrumbs are added', async () => {
      const breadcrumbs = (updatedPages && updatedPages[4].breadcrumbs) || [];

      expect(breadcrumbs.length).toBe(3);
      expect(breadcrumbs[0]).toEqual({
        label: 'Folder A Index',
        path: 'route/folderA/index',
        id: '/FolderA/index.mdx'
      });
      expect(breadcrumbs[1]).toEqual({
        label: 'Subfolder A Index',
        path: 'route/folderA/subfolderA/index',
        id: '/FolderA/SubfolderA/index.mdx'
      });
      expect(breadcrumbs[2]).toEqual({
        label: 'Subfolder A Page A',
        path: 'route/folderA/subfolderA/pageA',
        id: '/FolderA/SubfolderA/PageA.mdx'
      });
    });

    describe('AND WHEN a page already has breadcrumbs', () => {
      test('THEN those breadcrumbs are used', () => {
        const breadcrumbs = (updatedPages && updatedPages[6].breadcrumbs) || [];
        expect(breadcrumbs.length).toBe(2);
        expect(breadcrumbs[0]).toEqual({
          label: 'Label A',
          path: 'path/A',
          id: 'id A'
        });
        expect(breadcrumbs[1]).toEqual({
          label: 'Label B',
          path: 'path/B',
          id: 'id B'
        });
      });
    });

    describe('AND WHEN a page has a layout without breadcrumbs UI', () => {
      beforeEach(async () => {
        const pagesWithWrongLayout = [
          {
            fullPath: '/FolderA/index.mdx',
            route: 'route/folderA/index',
            title: 'Folder A Index',
            layout: 'Landing'
          },
          {
            fullPath: '/FolderA/pageA.mdx',
            route: 'route/folderA/pageA',
            title: 'Folder A Page A',
            layout: 'Newsletter'
          }
        ];
        const $afterSource = BreadcrumbsPlugin.$afterSource;
        // @ts-ignore
        updatedPages =
          (await $afterSource?.(pagesWithWrongLayout, {}, { indexPageName: 'index.mdx' })) || [];
      });
      test('THEN **NO** breadcrumbs are added to the page', () => {
        const breadcrumbs = (updatedPages && updatedPages[0].breadcrumbs) || [];
        expect(breadcrumbs.length).toEqual(0);
      });
    });
  });
});
