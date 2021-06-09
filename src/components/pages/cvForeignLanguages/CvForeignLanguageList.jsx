import React from 'react'
import CvForeignLanguageService from '../../services/CvForeignLanguageService'

export default function CvForeignLanguageList() {

    const [cvForeignLanguages, setCvForeignLanguages] = useState([]);

    useEffect(() => {
        let cvForeignLanguageService = new CvForeignLanguageService()
        cvForeignLanguageService.getCvForeignLanguages().then(result => setCvForeignLanguages(result.data.data))
    }, [])

    return (
        <div>
             <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Yabancı Dil</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        cvForeignLanguages.map(cvForeignLanguage => (
                            <Table.Row key={cvForeignLanguage.cvforeignLanguageId}>
                                <Table.Cell>{cvForeignLanguage.cvforeignLanguageId}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='1'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}
