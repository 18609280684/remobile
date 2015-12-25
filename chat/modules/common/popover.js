var React = require('react');
var UI = require('UI');

var View = UI.View;
var Content = UI.Content;
var PopoverModal = UI.Modal.PopoverModal;
var List = UI.List;
var Button = UI.Button.Button;


var PopoverModalInstance = React.createClass({
	render: function() {
		return (
      <PopoverModal target={this.props.target} >
              <List.List block>
                  <li><Button list >List Button 1</Button></li>
                  <li><Button list >List Button 1</Button></li>
                  <li><Button list >List Button 1</Button></li>
              </List.List>
      </PopoverModal>
      )
    }
  });

function showPopover(e) {  
	app.showModal('popoverModal', <PopoverModalInstance target={e.target}/>);
}

module.exports = React.createClass({
	render: function() {
		return (
			<View.Page title="Popover">
				<View.PageContent>
					<Content.ContentBlock>
		        <p>Of course, Framework7 has Popovers. Popovers may be called on absolutely any element with dynamic positioning. Note that due to Apple guide lines it is not recommended to use popovers on iPhone, only on bigger screens (iPad), so on small screen it may have wrong positioning because it is not fit to screen. For iPhone it is recommended to use <a href="#" onClick={showPopover}>actions and modals</a> instead. Try the "bars" icon on navbar, "menu" link on bottom toolbar, links and buttons in text below:</p>
		        <p><a href="#" onClick={showPopover}>Open popover on me</a></p>
		        <p>Mauris fermentum neque et luctus venenatis. Vivamus a sem rhoncus, ornare tellus eu, euismod mauris. In porta turpis at semper convallis. Duis adipiscing leo eu nulla lacinia, quis rhoncus metus condimentum. Etiam nec malesuada nibh. Maecenas quis lacinia nisl, vel posuere dolor. Vestibulum condimentum, nisl ac vulputate egestas, neque enim dignissim elit, rhoncus volutpat magna enim a est. Aenean sit amet ligula neque. Cras suscipit rutrum enim. Nam a odio facilisis, elementum tellus non, <a href="#" onClick={showPopover}>popover</a> tortor. Pellentesque felis eros, dictum vitae lacinia quis, lobortis vitae ipsum. Cras vehicula bibendum lorem quis imperdiet.</p>
		        <p>In hac habitasse platea dictumst. Etiam varius, ante vel ornare facilisis, velit massa rutrum dolor, ac porta magna magna lacinia nunc. Curabitur <a href="#" onClick={showPopover}>popover!</a> cursus laoreet. Aenean vel tempus augue. Pellentesque in imperdiet nibh. Mauris rhoncus nulla id sem suscipit volutpat. Pellentesque ac arcu in nisi viverra pulvinar. Nullam nulla orci, bibendum sed ligula non, ullamcorper iaculis mi. In hac habitasse platea dictumst. Praesent varius at nisl eu luctus. Cras aliquet porta est. Quisque elementum quis dui et consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sed laoreet purus. Pellentesque eget ante ante.</p>
		        <p>Duis et ultricies nibh. Sed facilisis turpis urna, ac imperdiet erat venenatis eu. Proin sit amet faucibus tortor, et varius sem. Etiam vitae lacinia neque. Aliquam nisi purus, interdum in arcu sed, ultrices rutrum arcu. Nulla mi turpis, consectetur vel enim quis, facilisis viverra dui. Aliquam quis convallis tortor, quis semper ligula. Morbi ullamcorper <a href="#" onClick={showPopover}>one more popover</a> massa at accumsan. Etiam purus odio, posuere in ligula vitae, viverra ultricies justo. Vestibulum nec interdum nisi. Aenean ac consectetur velit, non malesuada magna. Sed pharetra vehicula augue, vel venenatis lectus gravida eget. Curabitur lacus tellus, venenatis eu arcu in, interdum auctor nunc. Nunc non metus neque. Suspendisse viverra lectus sed risus aliquet, vel accumsan dolor feugiat.</p>
		      </Content.ContentBlock>
				</View.PageContent>
       </View.Page>
		);
	}
});