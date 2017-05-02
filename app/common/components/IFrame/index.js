import React from 'react';

export default class IFrame extends React.Component {
  componentDidMount() {
    this._updateIframe();
  }
  componentDidUpdate() {
    this._updateIframe();
  }
  iframe = null;
  _updateIframe() {
    const iframe = this.iframe;
    const document = iframe.contentDocument;
    document.close();
    document.open();
    document.write(this.props.content);
  }

  render() {
    const { content, ...rest } = this.props; // eslint-disable-line
    return <iframe ref={(v) => { this.iframe = v; }} {...rest} />;
  }
}
