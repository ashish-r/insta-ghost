let isOn = true;
const blockRuleId = 1;

if (typeof browser === 'undefined') {
  browser = chrome;
}

function toggleBadge(isFlagFalse) {
  if(isFlagFalse) {
    browser.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: [blockRuleId],
      },
      () => {
        isOn = false;
        browser.action.setBadgeText(
          {
            text: "OFF"
          },
        );
        browser.action.setBadgeTextColor(
          {
            color: "red"
          },
        );
        browser.action.setTitle({
          title: 'Enable Insta Ghost'
        });
      }
    )
    
    
    return;
  } 
  browser.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [blockRuleId],
      addRules: [
        {
          "id": blockRuleId,
          "priority": 1,
          "action": { "type": "block" },
          "condition": {
            "urlFilter" : "instagram.com/api/graphql",
            "initiatorDomains" : ["instagram.com"],
            "requestDomains": ["instagram.com"]
          }
        }
      ]
    },
    () => {
      isOn = true;
      browser.action.setBadgeText(
        {
          text: "ON"
        },
      );
      browser.action.setBadgeTextColor(
        {
          color: "blue"
        },
      );
      browser.action.setTitle({
        title: 'Disable Insta Ghost'
      });
    }
  )
}

function init() {
  browser.action.setBadgeBackgroundColor({
    color: "#87CEEB"
  });
  browser.action.getBadgeText({}).then((currText) => {
    toggleBadge(currText === 'OFF');
    browser.action.onClicked.addListener((tab) => {
      toggleBadge(isOn);
    });
  })
}


browser.runtime.onStartup.addListener( () => {
  init();
});

init();
