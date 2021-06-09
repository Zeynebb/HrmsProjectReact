import React, { useEffect, useState } from 'react'
import UniversityService from '../../services/UniversityService'

export default function UniversityList() {

    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        let universityService = new UniversityService()
        universityService.getUniversities().then(result => setUniversities(result.data.data))
    }, [])

    return (
        <div>
            <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Üniversite</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        universities.map(university => (
                            <Table.Row key={university.universityId}>
                                <Table.Cell>{university.universityName}</Table.Cell>
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
