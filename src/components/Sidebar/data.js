import HomeIcon from '@material-ui/icons/Home';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import GroupIcon from '@material-ui/icons/Group';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SchoolIcon from '@material-ui/icons/School';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PublicIcon from '@material-ui/icons/Public';
import SettingsIcon from '@material-ui/icons/Settings';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';


export const data =
    [
        {
            id: 1,
            name: 'Dashboard',
            icon: <HomeIcon />,
            url: '/',
        },
        {
            id: 2,
            name: 'Kegiatan & Aktivis',
            icon: <EventAvailableIcon />,
            children: [
                { id: 2.1, name: 'Text 1', url: '/KegiatanDanAktivis' },
                { id: 2.2, name: 'Text 2', url: '/KegiatanDanAktivis' },
                { id: 2.3, name: 'Text 3', url: '/KegiatanDanAktivis' },
            ]
        },
        {
            id: 3,
            name: 'Aktivis & Jamaah',
            icon: <GroupIcon />,
            url: '/aktivis'
        },
        {
            id: 4,
            name: 'Questionnaire',
            icon: <LibraryAddCheckIcon />,
            url: '/questionnaire'
        },
        {
            id: 5,
            name: 'Perguruan Tinggi',
            icon: <SchoolIcon />,
            url: '/PerguruanTinggi'
        },
        {
            id: 6,
            name: 'Ruang Curhat',
            icon: <QuestionAnswerIcon />,
            url: '/RuangCurhat'
        },
        {
            id: 7,
            name: 'Data Administrasi Regional',
            icon: <AccountBalanceIcon />,
            children: [
                { id: 6.1, name: 'Text 1', url: '/DataAdministrasiRegional' },
                { id: 6.2, name: 'Text 2', url: '/DataAdministrasiRegional' },
                { id: 6.3, name: 'Text 3', url: '/DataAdministrasiRegional' },
            ]
        },
        {
            id: 8,
            name: 'Public Content Management',
            icon: <PublicIcon />,
            children: [
                { id: 7.1, name: 'Text 1', url: '/PublicContentManagement' },
                { id: 7.2, name: 'Text 2', url: '/PublicContentManagement' },
                { id: 7.3, name: 'Text 3', url: '/PublicContentManagement' },
            ]
        },
        {
            id: 9,
            name: 'Setting',
            icon: <SettingsIcon />,
            children: [
                { id: 8.1, name: 'Text 1', url: '/Setting' },
                { id: 8.2, name: 'Text 2', url: '/Setting' },
                { id: 8.3, name: 'Text 3', url: '/Setting' },
            ]
        },
    ]
