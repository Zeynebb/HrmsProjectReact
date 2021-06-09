import React, { useEffect, useState } from 'react'
import CvService from '../../services/CvService'
import { Icon, Menu, Table } from 'semantic-ui-react'

export default function CvList() {

    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        let cvService = new CvService()
        cvService.getCvs().then(result => setCvs(result.data.data))
    }, [])

    return (
        <div>
            <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Ön Söz</Table.HeaderCell>
                        <Table.HeaderCell>Doğum Yılı</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>İsim</Table.HeaderCell>
                        <Table.HeaderCell>Soyisim</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        cvs.map(cv => (
                            <Table.Row key={cv.cvId}>
                                <Table.Cell>{cv.objective}</Table.Cell>
                                <Table.Cell>{cv.jobSeeker.birthYear}</Table.Cell>
                                <Table.Cell>{cv.jobSeeker.email}</Table.Cell>
                                <Table.Cell>{cv.jobSeeker.firstName}</Table.Cell>
                                <Table.Cell>{cv.jobSeeker.lastName}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
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
