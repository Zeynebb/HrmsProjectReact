import React, { useEffect, useState } from 'react'
import EducationInformationService from '../../services/EducationInformationService'
import { Icon, Menu, Table } from 'semantic-ui-react'

export default function CvEducationInformationList() {

    const [educationInformations, setEducationInformations] = useState([])

    useEffect(() => {
        let educationInformationService = new EducationInformationService()
        educationInformationService.getEducationInformations().then(result => setEducationInformations(result.data.data))
    },[])

    return (
        <div>
            <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>İsim</Table.HeaderCell>
                        <Table.HeaderCell>Soyisim</Table.HeaderCell>
                        <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>Üniversite</Table.HeaderCell>
                        <Table.HeaderCell>Bölüm</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        educationInformations.map(educationInformation => (
                            <Table.Row key={educationInformation.educationInformationId}>
                                <Table.Cell>{educationInformation.cv.jobSeeker.firstName}</Table.Cell>
                                <Table.Cell>{educationInformation.cv.jobSeeker.lastName}</Table.Cell>
                                <Table.Cell>{educationInformation.startingDate}</Table.Cell>
                                <Table.Cell>{educationInformation.graduationDate}</Table.Cell>
                                <Table.Cell>{educationInformation.university.universityName}</Table.Cell>
                                <Table.Cell>{educationInformation.universityDepartment.universityDepartmentName}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
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
