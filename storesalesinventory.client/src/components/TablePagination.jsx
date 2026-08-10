import React from 'react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableFooter,
    TableCell,
    TableBody,
    MenuItem,
    Icon,
    Label,
    Menu,
    Table, Button
} from 'semantic-ui-react'

const TablePagination = () => (
    <Table celled>
        <TableHeader>
            <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Address</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow>
                <TableCell>
                    {/* <Label ribbon>First</Label> */}
                    Cell
                </TableCell>
                <TableCell>Cell</TableCell>
                <TableCell><Button circular icon color='blue'>
                    <Icon name='edit' /> Edit
                </Button></TableCell>
                <TableCell>Cell</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Cell</TableCell>
                <TableCell>Cell</TableCell>
                <TableCell>Cell</TableCell>
                <TableCell>Cell</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Cell</TableCell>
                <TableCell>Cell</TableCell>
                <TableCell>Cell</TableCell>
                <TableCell>Cell</TableCell>
            </TableRow>
        </TableBody>

        <TableFooter>
            <TableRow>
                <TableHeaderCell colSpan='4'>
                    <Menu floated='right' pagination>
                        <MenuItem as='a' icon>
                            <Icon name='chevron left' />
                        </MenuItem>
                        <MenuItem as='a'>1</MenuItem>
                        <MenuItem as='a'>2</MenuItem>
                        <MenuItem as='a'>3</MenuItem>
                        <MenuItem as='a'>4</MenuItem>
                        <MenuItem as='a' icon>
                            <Icon name='chevron right' />
                        </MenuItem>
                    </Menu>
                </TableHeaderCell>
            </TableRow>
        </TableFooter>
    </Table>
)

export default TablePagination
