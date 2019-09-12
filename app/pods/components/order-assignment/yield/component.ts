import Component from '@ember/component';

class Yielder extends Component {
  tagName: string = '';
}

Yielder.reopenClass({
  positionalParams: ['component'],
});

export default Yielder;
