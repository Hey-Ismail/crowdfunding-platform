const testCampaign = async () => {
  const data = {
    campaign_title: 'AI Automated Farm Bot',
    campaign_story: 'A robot to automatically water and weed your garden.',
    category: 'Technology',
    funding_goal: 50000,
    minimum_Contribution: 50,
    deadline: '2026-12-31',
    reward_info: 'Get an early version of the Farm Bot.',
    campaign_image_url: 'https://example.com/farmbot.jpg',
    creator_name: 'Test Creator',
    creator_email: 'test@creator.com'
  };

  try {
    const res = await fetch('http://localhost:5000/newCampaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

testCampaign();
