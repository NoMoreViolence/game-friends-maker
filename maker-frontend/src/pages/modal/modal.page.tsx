import * as React from 'react';

interface Close {
  close: () => void;
}
interface Props extends Close {
  component?: React.ComponentClass<Close>;
}
interface State {
  wrapperRef: HTMLDivElement | null;
}

class ModalPage extends React.Component<Props, State> {
  public wrapperRef: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  };
  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  };

  public setWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node;
  };
  public handleClickOutside = (event: MouseEvent) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target as HTMLBodyElement)) {
      this.props.close();
    }
  };

  render = () => (
    <div className="modal transparent-black-background">
      <div ref={this.setWrapperRef} className="modal-card white-background white-gray-border radius transparent-shadow">
        {this.props.component && <this.props.component close={this.props.close} />}
      </div>
    </div>
  );
}

export default ModalPage;
