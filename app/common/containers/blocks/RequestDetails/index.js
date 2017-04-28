import React from 'react';
import classnames from 'classnames';
import HttpStatusCode from 'http-status-codes';
import Highlight from 'react-highlight';
import CopyToClipboard from 'react-copy-to-clipboard';

import Button from 'components/Button';
import highlight from 'highlight.js/styles/color-brewer.css';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Url from 'url';

import { PUBLIC_API_ENDPOINT } from 'config';

import styles from './styles.scss';

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

const headersToArray = headers => headers.map(i => ({
  type: capitalize(Object.keys(i)[0]),
  value: Object.values(i)[0],
}));

const responseToHttp = response =>
  `HTTP/1.1 ${response.status_code} ${HttpStatusCode.getStatusText(response.status_code)}\n` +
  `${headersToArray(response.headers).map(({ type, value }) => `${type}: ${value}`).join('\n')}\n\n` +
  `${JSON.stringify(JSON.parse(response.body), null, 2)}\n`;

const requestToUrl = request => Url.format({
  pathname: request.uri,
  query: request.query,
});

const requestToHttp = request =>
  `${request.method} ${requestToUrl(request)} HTTP/1.1\n` +
  `${headersToArray(request.headers).map(({ type, value }) => `${type}: ${value}`).join('\n')}\n\n` +
  `${JSON.stringify(request.body, null, 2)}\n`;

const requestToCurl = request =>
  `curl -X ${request.method} ${PUBLIC_API_ENDPOINT}${requestToUrl(request)} \\\n` +
  `     ${headersToArray(request.headers).map(({ type, value }) => `-H '${type}: ${value}'`).join(' \\\n     ')} \\\n` +
  `     -d '${JSON.stringify(request.body)}'`;

@withStyles(highlight)
@withStyles(styles)
export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.onCopy = this.onCopy.bind(this);
  }
  state = {
    curlCopied: false,
  };
  onCopy() {
    this.setState({ curlCopied: true }, () => {
      setTimeout(() => {
        this.setState({ curlCopied: false });
      }, 1500);
    });
  }
  render() {
    const { request, response, latencies, onDeleteRequestClick = () => {}, ...rest } = this.props;
    const curl = requestToCurl(request);
    return (<div className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.column__header}>
            Request
            <div className={styles.column__header__buttons}>
              <CopyToClipboard text={curl} onCopy={this.onCopy}>
                <Button theme="link">{this.state.curlCopied ? 'Copied' : 'Copy CURL'}</Button>
              </CopyToClipboard>
            </div>
          </div>
          <div className={styles.column__body}>
            <Highlight className="language-http">
              { requestToHttp(request) }
            </Highlight>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.column__header}>Response</div>
          <div className={styles.column__body}>
            <Highlight className="language-http">
              { responseToHttp(response) }
            </Highlight>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={classnames(styles.column)}>
          <div className={styles.column__header}>Latencies</div>
          <div className={styles.column__body}>
            <p><b>Client request</b>: {latencies.client_request}ms</p>
            <p><b>Gateway</b>: {latencies.gateway}ms</p>
            <p><b>Upstream</b>: {latencies.upstream ? `${latencies.upstream}ms` : '–'}</p>
            <p><b>Total</b>: {
              latencies.client_request + latencies.gateway + latencies.upstream
            }ms</p>
          </div>
        </div>
        <div className={classnames(styles.column)}>
          <div className={styles.column__header}>Info</div>
          <div className={styles.column__body}>
            <p><b>ID</b>: {rest.id}</p>
            <p><b>Idempotency key</b>: {rest.idempotency_key || '–'}</p>
            <p><b>Updated at</b>: {rest.updated_at}</p>
            <p><Button theme="link" color="red" onClick={onDeleteRequestClick}>Delete request</Button></p>
          </div>
        </div>
      </div>
    </div>);
  }
}
