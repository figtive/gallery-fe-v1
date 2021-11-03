import { BlogCategoryType, CourseType, ProjectFieldType } from './constant';
import type { Blog, Project } from './dtos';

export const projects: Project[] = [
	{
		id: 'uuid1',
		name: 'Gallery PPL 2122',
		team: 'Fight Interactive',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
		thumbnail: 'https://picsum.photos/seed/asd1/200/256',
		active: true,
		course: CourseType.PPL,
		field: ProjectFieldType.Social,
		metadata: JSON.stringify({
			partner: 'Fasilkom UI',
			productOwner: ['mpitsky'],
			scrumMaster: [],
			developmentTeam: ['daystram', 'ilmannafian', 'irbahhana']
		}),
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid2',
		name: 'Test Project 2',
		team: 'Team 2',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
		thumbnail: 'https://picsum.photos/seed/asd2/200/256',
		active: false,
		course: CourseType.PPL,
		field: ProjectFieldType.Government,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid3',
		name: 'Test Project 3',
		team: 'Team 3',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
		thumbnail: 'https://picsum.photos/seed/asd3/200/256',
		active: true,
		course: CourseType.PPL,
		field: ProjectFieldType.NewInnovation,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid4',
		name: 'Test Project 4',
		team: 'Team 4',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
		thumbnail: 'https://picsum.photos/seed/asd4/200/256',
		active: true,
		course: CourseType.PPL,
		field: ProjectFieldType.Startup,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid5',
		name: 'Test Project 5',
		team: 'Team 4',
		description: 'lorem',
		thumbnail: 'https://picsum.photos/seed/asd5/200/256',
		active: false,
		course: CourseType.PPL,
		field: ProjectFieldType.NewInnovation,
		createdAt: '2021-11-02T11:27:03.709Z'
	}
];

export const blogs: Blog[] = [
	{
		id: 'uuid1',
		title: 'タイトル　１',
		author: 'User 1',
		category: BlogCategoryType.Agile,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid2',
		title: 'タイトル　２',
		author: 'User 2',
		category: BlogCategoryType.Deployment,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid3',
		title: 'タイトル　３',
		author: 'User 3',
		category: BlogCategoryType.Engineering,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid4',
		title: 'タイトル　４',
		author: 'User 4',
		category: BlogCategoryType.Engineering,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid5',
		title: 'タイトル　５',
		author: 'User 5',
		category: BlogCategoryType.Engineering,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid6',
		title: 'タイトル　６',
		author: 'User 6',
		category: BlogCategoryType.Engineering,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid7',
		title: 'タイトル　７',
		author: 'User 7',
		category: BlogCategoryType.Engineering,
		createdAt: '2021-11-02T11:27:03.709Z'
	},
	{
		id: 'uuid8',
		title: 'タイトル　８',
		author: 'User 8',
		category: BlogCategoryType.Engineering,
		createdAt: '2021-11-02T11:27:03.709Z'
	}
];