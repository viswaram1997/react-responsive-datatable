import React, { Component } from 'react';
class ResponsiveDataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headers: [],
            tableData: [],
            inputTypes: ["text", "radio", "checkbox"],
            contentType: ["button", "div"]
        }
    }
    componentDidMount() {
        var { headers = [], tableData = [] } = this.props
        this.setState({
            headers,
            tableData
        })
    }
    componentWillReceiveProps(props) {
        var { headers = [], tableData = [] } = props
        this.setState({
            headers,
            tableData
        })
    }
    _handleFilter(value) {
        var { tableData } = this.props
        var finalData = tableData.filter((data) => {
            var key = Object.keys(data)
            return key.some((key) => {
                var result = data[key].search(new RegExp(value, "i"))
                if (result !== -1) {
                    return true
                }
                return false
            })
        })
        this.setState({
            tableData: finalData
        })
    }
    createElement({ type, buttonData }) {
        var finalElement = buttonData.map(({ label = "", onClickHandler = "", className = "" }) => {
            return (
                React.createElement(type, { ...(onClickHandler !== "" ? { onClick: onClickHandler } : ""), className }, 'one')
            )
        })
        return finalElement
    }
    render() {
        var { headers = [], tableData = [], inputTypes, contentType } = this.state
        return (
            <div className="react-data-table">
                <div className="react-data-table-search-input">
                    <input type="text" onChange={({ target: { value } }) => {
                        this._handleFilter(value)
                    }} />
                </div>
                <table className={`react-responsive-table`}>
                    <thead>
                        <tr>
                            {headers.map(({ title = "" }, index) => <th key={index}>{title}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data, index) => {
                            return (
                                <tr key={index}>
                                    {headers.map((header, i) => {
                                        var { key, editable = false, title = "", onChangeHandler, type = "td", placeholder = "" } = header
                                        if (inputTypes.includes(type)) {
                                            return (
                                                <td key={i} data-column={title} className={`${type === "text" ? "responsive-input" : ""}`}>
                                                    <input type={type}
                                                        placeholder={placeholder}
                                                        // value={data[key]}
                                                        onChange={(e) => {
                                                            onChangeHandler(e, data)
                                                        }}
                                                    />
                                                </td>
                                            )
                                        } else if (contentType.includes(type)) {
                                            return <td key={i}> {this.createElement(header)}</td>
                                        }
                                        return (<td key={i} data-column={title}>{data[key]}</td>)
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResponsiveDataTable;
