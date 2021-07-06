import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Icon, Menu, Table } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService'
import { getEmployer } from '../../../store/actions/EmployerActions';
import { NavLink } from 'react-router-dom';

export default function UpdatedEmployerList() {

    const dispatch = useDispatch()
    let [employers, setEmployers] = useState([])
    let employerService = new EmployerService()

    useEffect(() => {
        employerService.getAllUpdatedEmployer().then(result => setEmployers(result.data.data))
    }, [])

    function handleEmployer(employer) {
        dispatch(getEmployer(employer))
    }
    return (
        <div>
            <Table celled selectable>
                <Table.Header color="black" >
                    <Table.Row>
                        <Table.HeaderCell style={{ backgroundColor: "black", color: "white" }}><Icon name="building"></Icon> Şirket İsmi</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "black", color: "white" }}>Website</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "black", color: "white" }}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {employers.map(employer => (
                    <Table.Body>
                        <Table.Row >
                            <Table.Cell ><Icon name="building"></Icon>{employer.companyName}</Table.Cell>
                            <Table.Cell>{employer.website}</Table.Cell>
                            <Table.Cell collapsing textAlign='right'>
                                <Button as={NavLink} to={`/updatedEmployerListApproval/${employer.userId}`}
                                    style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }} >Detay Görüntüle </Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
            <Menu styşe={{ marginLeft: "50%" }} inverted pagination>
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

        </div>
    )
}
