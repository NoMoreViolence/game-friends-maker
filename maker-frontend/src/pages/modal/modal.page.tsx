import * as React from 'react';

interface Action {
  action?: (value?: any) => any;
}
interface Close {
  close: () => void;
}
interface Props extends Close, Action {
  component?: React.ComponentClass<Close & Action>;
}
interface State {
  wrapperRef: HTMLDivElement | null;
}

class ModalPage extends React.Component<Props, State> {
  public wrapperRef: HTMLDivElement | null = null;

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside, false);
    document.addEventListener('keydown', this.detectEscClick, false);
  };
  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
    document.addEventListener('keydown', this.detectEscClick, false);
  };

  public setWrapperRef = (node: HTMLDivElement) => {
    this.wrapperRef = node;
  };
  public handleClickOutside = (event: MouseEvent) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target as HTMLBodyElement)) {
      this.props.close();
    }
  };
  public detectEscClick = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.props.close();
    }
  };

  render = () => (
    <div className="modal transparent-black-background">
      <div ref={this.setWrapperRef} className="modal-card white-background white-gray-border radius transparent-shadow">
        {this.props.component && <this.props.component action={this.props.action} close={this.props.close} />}
      </div>
    </div>
  );
}

export default ModalPage;
